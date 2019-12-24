export default function ({ store, error }) {
  if (!store.state.access_token) {
    error({
      message: '未登录',
      statusCode: 403
    })
  }
}
