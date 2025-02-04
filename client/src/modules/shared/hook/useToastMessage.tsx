import tickIcon from '/tick-square.png'
import errorIcon from '/error-icon.png'

import { message, ConfigProvider } from 'antd'

export const useToastMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const showToastMessage = (msg: string, type: string) => {
    messageApi.open({
      key: 'toast',
      duration: 5,
      icon: null,
      content: (
        <div className="toast_content">
          <p>{msg}</p>
          {type === 'success' ? (
            <img src={tickIcon} alt="tick icon" />
          ) : (
            <img src={errorIcon} alt="tick icon" />
          )}
        </div>
      ),
      style: {
        marginTop: '95px',
      },
    })
  }

  const messageConfigProvider = (
    <ConfigProvider
      theme={{
        components: {
          Message: {
            contentBg: '#fff4ed',
            contentPadding: '10px 14px',
            boxShadow: '4px 4px 4px 0px #0000000D',
            fontSize: 16,
            colorText: '#424242',
          },
        },
      }}
    >
      {contextHolder}
    </ConfigProvider>
  )

  return {
    showToastMessage,
    messageConfigProvider,
  }
}
