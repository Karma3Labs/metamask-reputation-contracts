const retry = async (fn, tries = 3) => {
    try {
        await new Promise((r) => setTimeout(r, 2000))
        return await fn()
    } catch (e) {
        console.log(e)
        console.log('Retrying...', tries)
        if (tries - 1 === 0) {
            process.exit(1)
        }
        return retry(fn, tries - 1)
    }

}

module.exports = { retry }