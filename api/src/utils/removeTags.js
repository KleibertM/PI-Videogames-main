const removeTags = (description) => {
    const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
    description = description.replace(tagRegExp, '');
    return description;
}

module.exports = removeTags;