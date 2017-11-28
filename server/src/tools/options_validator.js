function optionsValidator (options, [keys]) {
    var result = options !== undefined && options !== null;
    if(result === true && options.props !== undefined) {
        for(let i = 0; i < keys.length; ++i) {
            result &= options.props.indexOf(keys[i]) > -1;
        }
    }
    return result;
}

module.exports = optionsValidator;