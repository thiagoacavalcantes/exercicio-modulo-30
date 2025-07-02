let hooksConf = {
    afterStep: function (test, scenario, { error, duration, passed }) {
        if (error) {
            driver.takeScreenshot();
        }
    },

    beforeSuite: async function () {
        // Verifica se o app está rodando. Se não estiver, ativa o app
        let state = await driver.queryAppState("br.art.ebaconline");
        if (state !== 4) {
            await driver.execute("mobile: activateApp", {
                appId: "br.art.ebaconline"
            });
        }
    },

    afterSuite: async function () {
        // Fecha o app após a suíte de testes
        await driver.execute("mobile: terminateApp", {
            appId: "br.art.ebaconline"
        });
    }
};

module.exports = { hooksConf };