/**
 * @author Lowkey
 * @date 2021/01/15 13:28:08
 * @Description: 提示信息
 */

export const rules = {
  xmxc: [
    {
      required: true,
      message: '请输入项目名称！'
    }
  ],
  region: [
    {
      required: true,
      message: '请输入大区！'
    }
  ],
  operator: [
    {
      required: true,
      message: '请输入作业者！'
    }
  ],
  basinName: [
    {
      required: true,
      message: '请输入盆地名称！'
    }
  ],
  block: [
    {
      required: true,
      message: '请输入区块！'
    }
  ],
  blockArea: [
    {
      required: true,
      message: '请输入面积！'
    }
  ],
  depth: [
    {
      required: true,
      message: '请输入水深！'
    }
  ],
  interests: [
    {
      required: true,
      message: '请输入权益！'
    }
  ]
};

export const pattern = (type) => {
  const obj = {};
  obj.href = /[a-zA-z]+:\/\/[^\\">]*/g;
  obj.svg = /mymobile/ig;
  obj.phone = /^1\d{10}$/;
  obj.email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return obj[type];
};

export const tips = {
  createSuccess: '创建成功',
  updateSuccess: '修改成功',
  deleteSuccess: '删除成功',
  calculateSuccess: '计算成功'
};
