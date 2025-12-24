/**
 * Format number to Indonesian Rupiah (IDR) format
 * Example: 10000 -> "10.000"
 * @param {number|string} amount - The amount to format
 * @returns {string} Formatted currency string with IDR format
 */
export function formatIDR(amount) {
  // Convert to number if it's a string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  // Check if it's a valid number
  if (isNaN(numAmount)) {
    return '0'
  }
  
  // Convert to integer (remove decimals for IDR)
  const integerAmount = Math.floor(numAmount)
  
  // Format with dot as thousand separator
  return integerAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Format number to Indonesian Rupiah (IDR) with currency symbol
 * Example: 10000 -> "Rp 10.000"
 * @param {number|string} amount - The amount to format
 * @param {boolean} showSymbol - Whether to show "Rp" prefix (default: true)
 * @returns {string} Formatted currency string with IDR format and symbol
 */
export function formatIDRCurrency(amount, showSymbol = true) {
  const formatted = formatIDR(amount)
  return showSymbol ? `Rp ${formatted}` : formatted
}

