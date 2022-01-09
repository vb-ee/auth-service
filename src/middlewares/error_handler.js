export const errorMiddleware = (err, req, res, next) => {
    console.error('Error: \n', err.stack)
    res.status(500).send({ success: false, message: err.message })
}
