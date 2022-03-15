// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            "/": {
                target: "http://192.168.100.150",
                // target: "http://10.8.0.4:78",
                changeOrigin: true,
                secure: false
            }
            //   "^/static": {
            //     target: "http://localhost:2310",
            //     changeOrigin: true
            //   },
            //   "^/print-asset": {
            //     target: "http://localhost:2310",
            //     changeOrigin: true
            //   }
        }
    },
    publicPath: process.env.NODE_ENV === "production" ? "" : ""
        //   publicPath:
        //     process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/"
};