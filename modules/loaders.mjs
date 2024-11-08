export class ContentLoader {
  constructor(elementID) {
    this.elementID = elementID;
    this.errorMessages = {
      404: "Content not found. Please try again later.",
      500: "Server error. Our team has been notified.",
      default: "Something went wrong while loading the content.",
      network: "Please check your internet connection and try again.",
      timeout: "Request timed out. Please try again.",
    };
  }

  async loadContent(url) {
    try {
      const response = await fetch(url, {
        timeout: 5000, // 5 second timeout
        headers: {
          Accept: "text/html",
        },
      });

      if (!response.ok) {
        return this.handleError(response.status, url);
      }

      const content = await response.text();

      // Validate content isn't empty
      if (!content.trim()) {
        return this.createErrorElement(
          "The requested content appears to be empty."
        );
      }

      return content;
    } catch (error) {
      return this.handleCatchError(error, url);
    }
  }

  handleError(status, url) {
    console.error(`Failed to load content from ${url}. Status: ${status}`);

    const message = this.errorMessages[status] || this.errorMessages.default;
    return this.createErrorElement(message);
  }

  handleCatchError(error, url) {
    console.error("Content loading error:", error);

    let message;
    if (
      error.name === "TypeError" &&
      error.message.includes("Failed to fetch")
    ) {
      message = this.errorMessages.network;
    } else if (error.name === "TimeoutError") {
      message = this.errorMessages.timeout;
    } else {
      message = this.errorMessages.default;
    }

    return this.createErrorElement(message);
  }

  createErrorElement(message) {
    return `
      <div class="content-error">
        <div class="error-icon">⚠️</div>
        <p class="error-message">${message}</p>
        <button onclick="window.location.reload()">Retry</button>
      </div>
    `;
  }
}
