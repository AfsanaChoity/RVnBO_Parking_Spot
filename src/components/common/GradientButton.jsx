import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        color: #07373F !important;
      > span {
        position: relative;
        font-weight: 600;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #A7F3D0 40%, #2DD4BF 100%);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before { filter: brightness(1.06); }
      &:active::before { filter: brightness(0.95); }
    }
  `,
}));
const GradientButton = ({ text }) => {
  const { styles } = useStyle();
  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Space>
        <Button type="primary" size="large" >
         {text}
        </Button>
       
      </Space>
    </ConfigProvider>
  );
};
export default GradientButton;