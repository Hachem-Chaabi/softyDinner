import { ConfigProvider, Spin } from 'antd'

function Spinner() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            colorPrimary: '#fa7337',
            colorFillSecondary: '#fff4ed',
          },
        },
      }}
    >
      <Spin size="large" className="spinner" />
    </ConfigProvider>
  )
}

export default Spinner
