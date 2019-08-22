const oldTreeMock = {
  tagName: 'ul',
  props: {
    className: 'user-list'
  },
  children: [
    {
      tagName: 'li',
      children: ['user1'],
      props: {
        className: 'user-item'
      },
    },
    {
      tagName: 'li',
      children: ['user2'],
      props: {
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user3'],
      props: {
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user4'],
      props: {
        className: 'user-item'
      }
    },
  ]
};

const newTreeMock = {
  tagName: 'ul',
  props: {
    className: 'user-list'
  },
  children: [
    {
      tagName: 'li',
      children: ['user5'],
      props: {
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user2'],
      props: {
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user1'],
      props: {
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user3'],
      props: {
        className: 'user-item'
      }
    },
  ]
};

module.exports = {
  newTreeMock,
  oldTreeMock
}