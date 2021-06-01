/**
 * @author Lowkey
 * @date 2021/02/04 12:52:30
 * @Description: //这里是node环境不能放二进制 src 是webpack
 */
import {Settings as LayoutSettings} from '@ant-design/pro-layout';
// @ts-ignore
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  footerRender: false,
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '海外新项目评价决策平台',
  pwa: false,
  iconfontUrl: '',
};

export default Settings;
