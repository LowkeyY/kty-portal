/**
 * @author Lowkey
 * @date 2021/01/14 10:56:32
 * @Description:
 */

import React, { Suspense, Component } from 'react';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import ScriptRecord from '@/components/ScriptRecord';
import { history, connect } from 'umi';

const getSize = (clientId) => {
  if (clientId !== '76c2ca53-2aea-4ccf-9109-303f316f2a70') {
    return { width: 1281, height: 959 };
  }
  return { width: 880, height: 575 };
};

const CunovsGuacamole = React.lazy(() => import('./components'));

class RemoteDesktop extends Component {
  constructor(props) {
    super(props);
    this.dom = React.createRef();
  }

  render() {
    const { location: { query } } = this.props;
    const { clientId = '76c2ca53-2aea-4ccf-9109-303f316f2a72' } = query;
    return (
      <PageContainer breadcrumb onBack={() => history.goBack()}>
        <Suspense fallback={<span>加载中。。。</span>}>
          <ScriptRecord>
            <CunovsGuacamole ref={this.dom} clientId={clientId} width={getSize(clientId).width}
                             height={getSize(clientId).height} />
          </ScriptRecord>
        </Suspense>
      </PageContainer>
    );
  }
};

export default connect(({ loading }) => ({
  loading
}))(RemoteDesktop);
