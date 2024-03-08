
const notification = {
    success(text, methods) {
        return methods.$notify({
            text: `${text}`,
            type: 'success',
            width: 400
        });
    },

    error(text, methods) {
        methods.$notify({
            text: `${text}`,
            type: 'error',
            width: 400
        });
    },

    warn(text, methods) {
        methods.$notify({
            text: `${text}`,
            type: 'warn',
            width: 400
        });
    }
}

export default notification 