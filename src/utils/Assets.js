export const Assets = {
    getAssetName: (item) => {
        if (item.includes("Token")) return "token_azul"
        return item.replace("-", "")
            .replace(/[çÇ]/g, "C")
            .replace(/[íÍ]/g, "I")
            .replace(/[ÀÁÂÃÄÅàáâãäå]/g, "A")
            .replace(/[ÈÉÊËéèê]/g, "E")
            .replace(/\s/g, '').toLowerCase().trim()
    }
}