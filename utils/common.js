const replaceVariables = (html, replacer) => {
    const replacerKeys = Object.keys(replacer)
    const replacerVal = Object.values(replacer)
    replacerKeys.map((replacerKey, replacerSeq) => {
        html = html.replaceAll(replacerKey, replacerVal[replacerSeq])
    })
    return html
}

module.exports = {
    replaceVariables
}