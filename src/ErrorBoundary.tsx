import React, { Component, ErrorInfo } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('에러 발생');
    console.warn({ error, info });

    this.setState({ error: true });
  }

  render() {
    return this.state.error ? <h1>에러 발생</h1> : this.props.children;
  }
}

export default ErrorBoundary;
