module.exports = {
    default: {
        require: [
            'tests/steps/*.js',
            'tests/support/*.js'
        ],
        paths: ['tests/features/*.feature'],
        dryRun: false,
        // format:['progress'],
        format: ["allure-cucumberjs/reporter"],
        formatOptions: {
            resultsDir: "allure-results",
        },
        parallel: 1,
        tags: ''
    }
}