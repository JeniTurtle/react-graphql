import { ApolloClient } from 'react-apollo'
import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import { IInputLoginAction } from '../../redux/actions/auth.action'

import LoginStyle from './login.style'

const FormItem = Form.Item

interface IProps {
  client: ApolloClient
  error: null | Error
  loading: boolean
  confirmSubmit?: (input: IInputLoginAction) => void
  clearError?: () => void
}

interface IState {
  isLogined: boolean
}

class LoginView extends React.Component<IProps, IState> {
  static readonly displayName = 'LoginView'

  static defaultProps = {
    loading: false
  }

  props: IProps & FormComponentProps

  state: IState = {
    isLogined: false
  }

  errorThrottle: string

  closeMsg: null | (() => void) = null

  constructor(props: IProps) {
    super(props)

    this.state = {
      isLogined: false
    }
  }

  componentWillReceiveProps({ error, clearError }: IProps) {
    if (!error || !error.message) {
      return
    }

    if (this.errorThrottle === error.message) {
      return
    }

    this.errorThrottle = error.message

    this.closeMsg = message.error(error.message, 2, () => {
      if (clearError) {
        this.errorThrottle = ''
        clearError()
      }
    })
  }

  onSubmit = (evt: any) => {
    evt.preventDefault()

    const { client, form, confirmSubmit } = this.props

    form.validateFields((err, input: IInputLoginAction) => {
      if (!err) {
        if (confirmSubmit) {
          confirmSubmit({ ...input, client })
        }
      }
    })
  }

  render() {
    const { loading, form } = this.props
    const { isLogined } = this.state
    const { getFieldDecorator } = form

    return (
      <LoginStyle>
        {!isLogined ? (
          <div className="content">
            <header>
              <h2>河湖健康评估系统</h2>
            </header>

            <div className="form">
              <Form onSubmit={this.onSubmit}>
                <FormItem>
                  {getFieldDecorator('username', {
                    validateTrigger: 'onBlur',
                    rules: [{ required: true, message: '请输入登录名' }]
                  })(<Input disabled={loading} placeholder="登录名" />)}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('password', {
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        min: 6,
                        message: '请输入不少于6位的密码'
                      }
                    ]
                  })(
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="密码"
                    />
                  )}
                </FormItem>

                <FormItem>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="submit"
                    loading={loading}
                  >
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        ) : (
          <div>已登录</div>
        )}
      </LoginStyle>
    )
  }
}

export default Form.create<IProps>()(LoginView as any)
