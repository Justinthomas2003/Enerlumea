import { useMemo } from "react";
import {
  Lightbulb,
  Zap,
  Sun,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import ApiStatus from "../../components/common/ApiStatus";
import useApiCollection from "../../hooks/useApiCollection";
import { listAppliances, listEnergyRecords } from "../../api/enerlumeaApi";
import { generateEnergyRecommendations } from "../../utils/energyRecommendations";

function EnergyRecommendations() {
  const appliancesState = useApiCollection(listAppliances);
  const recordsState = useApiCollection(listEnergyRecords);
  const recommendations = useMemo(() => generateEnergyRecommendations(
    appliancesState.items,
    recordsState.items,
  ), [appliancesState.items, recordsState.items]);
  const isLoading = appliancesState.isLoading || recordsState.isLoading;
  const loadError = appliancesState.error || recordsState.error;

  function retry() {
    void appliancesState.reload();
    void recordsState.reload();
  }

  const highPriority = recommendations.filter(
    (item) => item.priority === "High"
  ).length;

  const mediumPriority = recommendations.filter(
    (item) => item.priority === "Medium"
  ).length;

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Appliance Usage":
        return Zap;
      case "Solar Utilization":
        return Sun;
      case "Energy Overview":
        return TrendingUp;
      default:
        return Lightbulb;
    }
  };

  return (
    <div className="recommendations-page">
      <div className="recommendations-header">
        <div>
          <span className="recommendations-eyebrow">
            ENERGY INTELLIGENCE
          </span>
          <h1>Energy Recommendations</h1>
          <p>
            Practical suggestions based on your recorded appliance
            usage and energy data.
          </p>
        </div>

        <div className="recommendations-header-icon">
          <Lightbulb size={30} />
        </div>
      </div>

      <ApiStatus
        loading={isLoading}
        error={loadError}
        onRetry={retry}
        resource="recommendation data"
      />

      <div className="recommendation-stats">
        <div className="recommendation-stat-card">
          <div className="recommendation-stat-icon">
            <Lightbulb size={21} />
          </div>
          <div>
            <span>Total Recommendations</span>
            <h2>{recommendations.length}</h2>
          </div>
        </div>

        <div className="recommendation-stat-card">
          <div className="recommendation-stat-icon high">
            <AlertCircle size={21} />
          </div>
          <div>
            <span>High Priority</span>
            <h2>{highPriority}</h2>
          </div>
        </div>

        <div className="recommendation-stat-card">
          <div className="recommendation-stat-icon medium">
            <TrendingUp size={21} />
          </div>
          <div>
            <span>Medium Priority</span>
            <h2>{mediumPriority}</h2>
          </div>
        </div>
      </div>

      <div className="recommendations-section-heading">
        <div>
          <h2>Suggested Improvements</h2>
          <p>
            Each recommendation includes the rule and data behind it.
          </p>
        </div>
        <span className="recommendation-count">
          {recommendations.length} found
        </span>
      </div>

      {recommendations.length > 0 ? (
        <div className="recommendations-list">
          {recommendations.map((item) => {
            const CategoryIcon = getCategoryIcon(item.category);

            return (
              <article className="recommendation-card" key={item.id}>
                <div className="recommendation-card-top">
                  <div className="recommendation-title-group">
                    <div className="recommendation-icon">
                      <CategoryIcon size={22} />
                    </div>

                    <div>
                      <span className="recommendation-category">
                        {item.category}
                      </span>
                      <h3>{item.title}</h3>
                    </div>
                  </div>

                  <span
                    className={`priority-badge ${item.priority.toLowerCase()}`}
                  >
                    {item.priority} Priority
                  </span>
                </div>

                <p className="recommendation-description">
                  {item.description}
                </p>

                <div className="recommendation-reason">
                  <strong>Why this recommendation?</strong>
                  <p>{item.reason}</p>
                </div>

                <div className="recommendation-suggestion">
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>Suggested action</strong>
                    <p>{item.suggestion}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="recommendations-empty">
          <CheckCircle2 size={32} />
          <h3>No recommendations right now</h3>
          <p>
            Your current records did not trigger any recommendation rules.
          </p>
        </div>
      )}

      <div className="recommendations-disclaimer">
        <strong>About these recommendations</strong>
        <p>
          Recommendations are generated using predefined rules and
          saved appliance and energy-record data. They are
          suggestions, not guaranteed energy savings. No live meter
          readings or AI predictions are used.
        </p>
      </div>
    </div>
  );
}

export default EnergyRecommendations;
