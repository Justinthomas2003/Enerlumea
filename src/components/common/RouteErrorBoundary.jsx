import { Component } from "react";

export default class RouteErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="route-error" role="alert">
          <h2>This page could not be loaded.</h2>
          <p>Reload the page to try again.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
