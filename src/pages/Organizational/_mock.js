

const getMenu = () => {
  return  [
    {
      deptName: '国际项目部',
      deptId: '1',
      children: [
        {
          deptName: '美洲项目部',
          deptId: '1.1',
        },
        {
          deptName: '亚洲项目部',
          deptId: '1.2',
        },
      ],
    },
    {
      deptName: '财务部',
      deptId: '2',
      children: [
        {
          deptName: '财务部1',
          deptId: '2.1',
        },
        {
          deptName: '财务部2',
          deptId: '2.2',
        },
      ],
    },
  ];
};
const getUser = () => {
  return  {"data":{"data":[{"deptId":"1","photoPath":"cnvfile/feedback/0ca37a80-4d54-484c-9107-ef3148ecb811.jpg","userEmail":"222","userId":1,"userName":"wsy","userPhone":"131234","userPwd":"47bce5c74f589f4867dbd57e9ca9f808","userRealName":"王硕扬","userSex":"0"},{"deptId":"1","photoPath":"cnvfile/feedback/2500693d-8cbf-40f2-85fa-9cf5f4a3129a.png","userAge":22,"userEmail":"123123","userId":2,"userName":"zff","userPhone":"1234123","userPwd":"d41d8cd98f00b204e9800998ecf8427e","userRealName":"张菲菲","userSex":"1"},{"deptId":"1","photoPath":"","userEmail":"","userId":8,"userName":"1111","userPhone":"1231313231","userPwd":"d41d8cd98f00b204e9800998ecf8427e","userRealName":"1111","userSex":"0"}],"nowPage":1,"pageSize":10,"totalCount":3},"msg":"OK","oK":true,"status":200,"success":true}
};
export default {
  // 支持值为 Object 和 Array
  'GET  /api/queryDept': getMenu(),
  'GET  /api/queryUser': getUser()
};
