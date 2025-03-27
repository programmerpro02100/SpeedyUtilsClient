export function formatText(input: string) {
    return input
      .split('-') // Split by hyphen
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join with space
  }