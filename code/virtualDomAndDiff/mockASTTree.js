// 1 2[span1] 3 5 4[1234]
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
        key: "user-item1",
        className: 'user-item'
      },
    },
    {
      tagName: 'li',
      children: [
        'user2',
        {
          tagName: 'span',
          props: {key: 'span1'}
        }
      ],
      props: {
        key: "user-item2",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user3'],
      props: {
        key: "user-item3",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: [
        'user5',
        {
          tagName: 'span',
          props: {key: 'span1'}
        }
      ],
      props: {
        key: "user-item5",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user4', {
        tagName: 'ul',
        props: {
          className: 'user-list'
        },
        children: [
          {
            tagName: 'li',
            children: ['user1'],
            props: {
              key: "user-item1",
              className: 'user-item'
            },
          },
          {
            tagName: 'li',
            children: [
              'user2',
              {
                tagName: 'span',
                props: {key: 'span1'}
              }
            ],
            props: {
              key: "user-item2",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user3'],
            props: {
              key: "user-item3",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user4'],
            props: {
              key: "user-item4",
              className: 'user-item'
            }
          },
        ]
      }],
      props: {
        key: "user-item4",
        className: 'user-item'
      }
    },
  ]
};

// 2[p1] 1 6 4[2[span1]1543] 3
const newTreeMock = {
  tagName: 'ul',
  props: {
    className: 'user-list'
  },
  children: [
    {
      tagName: 'li',
      children: [
        'user2',
        {
          tagName: 'p',
          props: {key: 'p1'}
        }
      ],
      props: {
        key: "user-item2",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user1'],
      props: {
        key: "user-item1",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user6'],
      props: {
        key: "user-item6",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user4', {
        tagName: 'ul',
        props: {
          className: 'user-list'
        },
        children: [
          {
            tagName: 'li',
            children: [
              'user2',
              {
                tagName: 'span',
                props: {key: 'span1'}
              }
            ],
            props: {
              key: "user-item2",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user1'],
            props: {
              key: "user-item1",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user5'],
            props: {
              key: "user-item5",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user4'],
            props: {
              key: "user-item4",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user3'],
            props: {
              key: "user-item3",
              className: 'user-item'
            }
          },
        ]
      }],
      props: {
        key: "user-item4",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user3'],
      props: {
        key: "user-item3",
        className: 'user-item'
      }
    },
  ]
};

module.exports = {
  newTreeMock,
  oldTreeMock
}