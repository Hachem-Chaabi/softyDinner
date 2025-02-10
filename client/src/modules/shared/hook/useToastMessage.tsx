import TickIcon from '../assets/icons/toastMessage/tick-square.svg?react'
import ErrorIcon from '../assets/icons/toastMessage/close-square.svg?react'

import { message, ConfigProvider } from 'antd'

export const useToastMessage = ({ loginPage = false }: { loginPage?: boolean }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const showToastMessage = (msg: string, type: string) => {
    messageApi.open({
      key: 'toast',
      duration: 5,
      icon: null,
      content: (
        <div className="toast_content">
          <p>{msg}</p>
          {type === 'success' ? <TickIcon /> : <ErrorIcon />}
        </div>
      ),
      style: {
        marginTop: loginPage ? '' : '95px',
      },
    })
  }

  const messageConfigProvider = (
    <ConfigProvider
      theme={{
        components: {
          Message: {
            contentBg: loginPage ? '#ffffff' : '#fff4ed',
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
