## TCP
>简单来说 TCP协议的作用就是保证数据通信的完整性和可靠性，防止丢包。 比如说缓存满了新进来的数据包就会丢失，如果需要发现丢了哪一个包以及如何重新发送这个包，就依靠TCP协议
* 服务器发送数据，有许多原因会导致丢包，所以在线路允许的情况下达到最大速率，需要慢慢试，所以TCP设计了慢启动机制，开始的时候发送的比较慢，根据丢包情况调整速率
#### 三次握手和四次挥手
![](https://img-blog.csdn.net/20180717202520531?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4OTUwMzE2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

>三次握手解决的本质是，信道不可靠，双方确认信息：三次通信是理论上的最小值；所以三次握手是满足在不可靠的信道上可靠的传输信息。详情可见 <a href="https://groups.google.com/forum/#!topic/pongba/kF6O7-MFxM0/discussion" target="_blank">TCP为什么需要三次握手</a>
* 第一次握手：建立连接时，客户端发送SYN包(SYN=1, seq=随机一个32位长的序列号X)；然后客户端进入SYN_SEND状态等待服务器确认
* 第二次握手：服务器收到SYN报文段进行确认，设置ack=Z=X(接受到seq的值)+1；同事自己要发送SYN请求信息，SYN=1，seq=Y(随机一个32位长的序列号)，服务器将所有信息（SYN+ACK包）发送到客户端，服务器进入SYN_RECV状态
* 第三次握手：客户端接收到报文段（SYN+ACK包），将ack=Y+1, seq=Z(接收到的ack的值)+1;向服务器发送包ACK，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手

![](https://img-blog.csdn.net/20180717204202563?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4OTUwMzE2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
