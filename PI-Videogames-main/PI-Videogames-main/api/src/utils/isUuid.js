/* https://stackoverflow.com/questions/19989481/how-to-determine-if-a-string-is-a-valid-v4-uuid */

function isUuid(str) {
    return /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(str)
}

module.exports = isUuid