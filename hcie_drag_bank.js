window.HCIE_DRAG_BANK = [
  {
    "type": "drag",
    "q": "[第921题] HTTP状态码(HTTP Status Code)是服务器响应状态的3位数字码，用于向客户端返回操作结果.请将HTTP状态码和原因短语进行匹配",
    "pairs": [
      {
        "left": "1XX",
        "right": "请求被接收"
      },
      {
        "left": "2XX",
        "right": "请求成功"
      },
      {
        "left": "3XX",
        "right": "进一步操作需要被执行"
      },
      {
        "left": "4XX",
        "right": "请求错误"
      },
      {
        "left": "5XX",
        "right": "服务端错误"
      }
    ],
    "explanation": "解析（AI生成）：HTTP状态码按类别及对应原因短语的正确匹配为：\n- 1XX（信息类）：服务器已接收请求，需客户端进一步操作，对应“请求被接收”。\n- 2XX（成功类）：客户端请求被服务器成功处理，对应“请求成功”。\n- 3XX（重定向类）：需客户端进一步操作（如跳转）才能完成请求，对应“进一步操作需要被执行”。\n- 4XX（客户端错误类）：客户端请求存在错误（如格式、权限问题），对应“请求错误”。\n- 5XX（服务器错误类）：服务器自身故障导致无法处理请求，对应“服务端错误”。",
    "images": [
      "images/image328.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第922题] TWAMP通信模型中包含Session-Sender、Session-Reflector、Control-Client和Server，请将功能模块与对应描述匹配",
    "pairs": [
      {
        "left": "Control - Client",
        "right": "负责建立、启动和停止TWAMP会话，收集统计结果，主导会话生命周期管理"
      },
      {
        "left": "Server",
        "right": "响应Control - Client发起的会话请求（建立、启动、停止），作为服务端处理控制指令"
      },
      {
        "left": "Session - Sender",
        "right": "由Client调度，主动发送用于性能统计的探帧，触发探测流程"
      },
      {
        "left": "Session - Reflector",
        "right": "由Server调度，应答Session - Sender的探帧，完成探测帧的往返交互"
      }
    ],
    "explanation": "解析（AI生成）：TWAMP模型中各模块功能匹配如下：\n- **Control - Client**：负责建立、启动和停止TWAMP会话，收集统计结果，主导会话生命周期管理。\n- **Server**：响应Control - Client发起的会话请求（建立、启动、停止），作为服务端处理控制指令。\n- **Session - Sender**：由Client调度，主动发送用于性能统计的探帧，触发探测流程。\n- **Session - Reflector**：由Server调度，应答Session - Sender的探帧，完成探测帧的往返交互。\n逻辑：Control - Client/Server负责会话控制，Session - Sender（发帧，Client调度）与Session - Reflector（应答，Server调度）配合完成性能探测。\n（易错提醒：区分“Client/Server调度”和“发/应答”的功能方向，避免混淆发送/应答主体。）",
    "images": [
      "images/image329.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第923题] 请完成以下静态VXLAN隧道的配置，将对应配置拖拽到相应的区域",
    "pairs": [
      {
        "left": "3.3.3.3",
        "right": "①"
      },
      {
        "left": "1.1.",
        "right": "②"
      },
      {
        "left": "200",
        "right": "④"
      },
      {
        "left": "连线",
        "right": "3.3.3.3→①，1.1.1.→②，1.1.1.→③，200→④"
      }
    ],
    "explanation": "解析（AI生成）：解析：静态VXLAN隧道配置中，nve接口的`source`为本VTEP的IP，`head - end peer - list`为对端VTEP的IP，`vni`为VXLAN网络标识符（对应BD）。\n- VTEP3的IP为3.3.3.3/32，其nve 1的`source`（①）填3.3.3.3，`head - end peer - list`（②）填VTEP1的IP 1.1.1.1，`vni`为100（对应PC3的VNI 100）。\n- VTEP1的IP为1.1.1.1/32，其nve 1的`source`（③）填1.1.1.1，`vni`（④）为200（对应PC2的VNI 200，对端为VTEP2）。\n连线：3.3.3.3→①，1.1.1.→②，1.1.1.→③，200→④。",
    "images": [
      "images/image330.png",
      "images/image331.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第924题] 请将OSPFv3 LSA与其传递范围对应起来",
    "pairs": [
      {
        "left": "**Link - LSA**",
        "right": "本地链路范围"
      },
      {
        "left": "**AS - external - LSA**",
        "right": "自治系统范围"
      },
      {
        "left": "**Network - LSA**",
        "right": "区域内部传播"
      },
      {
        "left": "因此正确对应为",
        "right": "Link - LSA→本地链路范围，AS - external - LSA→自治系统范围，Network - LSA→区域内部传播"
      }
    ],
    "explanation": "解析（AI生成）：解析：OSPFv3中不同LSA的传递范围由其功能决定：\n1. **Link - LSA**：由路由器生成，仅在**本地链路范围**传播，描述本地链路的拓扑和前缀信息，对应“本地链路范围”。\n2. **AS - external - LSA**：用于通告自治系统外部路由，在**自治系统范围**内传播，对应“自治系统范围”。\n3. **Network - LSA**：由DR生成，在所属OSPF区域内传播，描述区域内网络拓扑，对应“区域内部传播”。\n因此正确对应为：Link - LSA→本地链路范围，AS - external - LSA→自治系统范围，Network - LSA→区域内部传播。",
    "images": [
      "images/image332.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第925题] 请将iMaster NCE业务开放可编程的开发流程按照先后顺序排列",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：iMaster NCE业务开放可编程开发流程的正确顺序（从先到后）为：\n1. 需求分析（明确业务需求，对应右侧数字2）；\n2. HLD设计（高层架构设计，对应右侧数字1）；\n3. 网元驱动包开发（适配网元通信，对应右侧数字5）；\n4. 业务包开发（实现业务逻辑，对应右侧数字3）；\n5. 进入生产环境（部署上线，对应右侧数字4）。\n流程逻辑：需求分析是起点，明确需求后进行HLD设计；接着开发网元驱动包适配网元，再开发业务包实现业务，最后部署到生产环境。",
    "images": [
      "images/image333.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第926题] 在遇到网络故障时，工程师经常使用分层故障处理法。因为所有模型都遵循相同的基本前提，当模型的所有低层结构工作正常时，它的高层结构才能正常工作。请根据分层法将以下检查项和对应的层次匹配",
    "pairs": [
      {
        "left": "**TCP连接、端口**",
        "right": "传输层：传输层"
      },
      {
        "left": "**接口协议UP、二层寻址**",
        "right": "数据链路层：数据链路层处理链路层协议"
      },
      {
        "left": "**接口物理状态、线缆**",
        "right": "物理层：物理层负责物理介质"
      },
      {
        "left": "**路由协议**",
        "right": "网络层：网络层负责IP寻址与路由选择"
      }
    ],
    "explanation": "解析（AI生成）：解析：根据网络分层（物理层、数据链路层、网络层、传输层）的功能逻辑匹配：\n1. **TCP连接、端口**→传输层：传输层（如TCP）负责端到端连接建立（TCP三次握手）和端口管理（区分应用层服务）。\n2. **接口协议UP、二层寻址**→数据链路层：数据链路层处理链路层协议（如以太网协议）和二层寻址（MAC地址），管理链路层协议状态与物理地址通信。\n3. **接口物理状态、线缆**→物理层：物理层负责物理介质（线缆、接头）、接口的物理状态（如是否UP），处理信号与物理连接。\n4. **路由协议**→网络层：网络层负责IP寻址与路由选择，路由协议（如OSPF）用于计算路由，属于网络层功能。\n（注：图中错误箭头需修正为上述正确逻辑，核心依据各层的功能定义。）",
    "images": [
      "images/image334.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第927题] 请将华为路由器MPLS标签相关的分类和默认方式进行匹配",
    "pairs": [
      {
        "left": "匹配关系为：标签发布方式",
        "right": "下游自主方式"
      },
      {
        "left": "标签分配控制方式",
        "right": "独立方式"
      },
      {
        "left": "标签保持方式",
        "right": "自由方式"
      }
    ],
    "explanation": "解析（AI生成）：华为路由器MPLS标签相关分类与默认方式匹配如下：标签发布方式默认是下游自主方式（下游LSR主动发布标签）；标签分配控制方式默认是独立方式（LSR自主决定标签分配，不受上游限制）；标签保持方式默认是自由方式（保留所有收到的标签，包括未使用的）。匹配关系为：标签发布方式→下游自主方式，标签分配控制方式→独立方式，标签保持方式→自由方式（与图中箭头指向一致）。",
    "images": [
      "images/image335.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第928题] 通过iMaster NCE-Campus部署的虚拟化园区网络如图所示，请将参数和参数部署的位置一一对应",
    "pairs": [
      {
        "left": "出口互联VLAN",
        "right": "部署于网关节点与外部网络的互联链路（位置1），实现网关节点与外部网络的IP层互联"
      },
      {
        "left": "VXLAN隧道",
        "right": "部署于网关节点与边缘节点的链路（位置3），建立VXLAN隧道传输VXLAN报文，支撑跨节点通信"
      },
      {
        "left": "接入VLAN",
        "right": "部署于拓展节点与终端的接入链路（位置6），终端通过接入VLAN接入园区网络"
      },
      {
        "left": "Loopback",
        "right": "部署于边缘节点（位置4），作为VXLAN控制平面（如BGP EVPN）的源IP，保障控制平面通信"
      },
      {
        "left": "透传BPDU",
        "right": "部署于边缘节点与拓展节点的链路（位置5），若拓展节点为二层设备，透传BPDU（如STP）以维护二层拓扑"
      },
      {
        "left": "BD（广播域）",
        "right": "部署于边缘节点（位置4），与VXLAN的VNID绑定，定义广播域范围，隔离广播流量"
      }
    ],
    "explanation": "解析（AI生成）：解析：结合虚拟化园区网络架构逻辑：\n1. 出口互联VLAN：部署于网关节点与外部网络的互联链路（位置1），实现网关节点与外部网络的IP层互联。\n2. VXLAN隧道：部署于网关节点与边缘节点的链路（位置3），建立VXLAN隧道传输VXLAN报文，支撑跨节点通信。\n3. 接入VLAN：部署于拓展节点与终端的接入链路（位置6），终端通过接入VLAN接入园区网络。\n4. Loopback：部署于边缘节点（位置4），作为VXLAN控制平面（如BGP EVPN）的源IP，保障控制平面通信。\n5. 透传BPDU：部署于边缘节点与拓展节点的链路（位置5），若拓展节点为二层设备，透传BPDU（如STP）以维护二层拓扑。\n6. BD（广播域）：部署于边缘节点（位置4），与VXLAN的VNID绑定，定义广播域范围，隔离广播流量。",
    "images": [
      "images/image336.png",
      "images/image337.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第929题] 如下图所示，请将SR的类型节点和位置进行匹配",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：解析：根据SRv6节点角色定义，结合图中数据包流程与SRH（Segment Routing Header）信息：\n- **Source Node（源节点）**：数据包从R1（位置①）始发，是流量起点，故匹配①。\n- **Transit Node（转发节点）**：R2（位置②）负责中间转发（无SR段处理，仅转发），故匹配②。\n- **Endpoint Node（端点节点）**：R3（位置③）处理SRH中的`FC03::3`段，R4（位置④）处理`FC04::4`和最终段`FC04:400`，二者均需解析SR段，故分别匹配③、④。\n（易错提醒：Endpoint Node需处理SRH中的段，可通过SRH的段信息（如`FC03::3`对应R3）判断。）",
    "images": [
      "images/image338.png",
      "images/image339.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第930题] 网络管理员需要permit或deny一些特定的路由，但是该网络管理员对于配置并不熟练，请帮助他合理地排序配置，使设备能按图中的要求permit或deny特定的路由",
    "pairs": [
      {
        "left": "从长到短：32",
        "right": "30"
      },
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：解析：IP前缀列表（ip - prefix）按**配置顺序从上到下匹配，匹配即停止**，且**掩码越长（越精确）的配置需优先放置**（避免被不精确配置覆盖）。根据路由掩码长度（从长到短：32→30→24→16→8）和Permit/Deny要求，配置顺序为：\n1. `ip ip - prefix TEST permit 10.0.0.0 30 less - equal 32`（匹配10.0.0.0/30~32，覆盖10.0.0.1/32 Permit）；\n2. `ip ip - prefix TEST deny 10.0.0.0 24 less - equal 32`（匹配10.0.0.0/24~32，覆盖10.0.0.0/24、10.0.0.128/30 Deny）；\n3. `ip ip - prefix TEST permit 10.0.0.0 16 less - equal 32`（匹配10.0.0.0/16~32，覆盖10.0.0.0/16、10.0.1.0/24 Permit）；\n4. `ip ip - prefix TEST deny 10.0.0.0 8 less - equal 32`（匹配10.0.0.0/8~32，覆盖10.0.0.0/8 Deny）。\n（核心逻辑：精确匹配优先，长掩码配置在前，确保特殊路由被正确Permit/Deny。）",
    "images": [
      "images/image340.png",
      "images/image341.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第931题] 请将以下BGP扩展团体属性的作用与名称对应起来",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：解析：1. EVPN Router’s MACExtendedCommunity：作用为传递VTEP（虚拟隧道端点）的Router MAC，用于标识EVPN环境中VTEP的路由器MAC地址；2. RT（Route Target）：通过匹配RT值控制路由的接收（及导出/导入），决定路由是否被接收进VPN实例；3. MAC Mobility：用于通知其他VP的虚拟机(VM)已迁移，传递VM的MAC移动事件信息。",
    "images": [
      "images/image342.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第932题] R1从CE收到一个普通IPv6报文，并生成如图所示的携带SRH的报文，该报文将沿着R1-&amp;gt；R2-&amp;gt；R3-&amp;gt；R4的路径进行转发，请标识各设备的节点类型。",
    "pairs": [
      {
        "left": "启动R1",
        "right": "R2"
      },
      {
        "left": "源节点",
        "right": "R1是生成携带SRH报文的发起节点，启动R1→R2→R3→R4的路径转发，故R1为源节点"
      },
      {
        "left": "中转节点",
        "right": "R2位于R1与R3之间，仅负责转发报文（不处理SRH的Segments列表），故R2为中转节点"
      },
      {
        "left": "匹配结果：源节点",
        "right": "R1"
      },
      {
        "left": "Endpoint节点",
        "right": "R3"
      },
      {
        "left": "匹配结果",
        "right": "源节点→R1，中转节点→R2，Endpoint节点→R3（或R4，依Segments列表处理逻辑）"
      }
    ],
    "explanation": "解析（AI生成）：根据SRv6节点类型定义：\n- **源节点**：R1是生成携带SRH报文的发起节点，启动R1→R2→R3→R4的路径转发，故R1为源节点。\n- **中转节点**：R2位于R1与R3之间，仅负责转发报文（不处理SRH的Segments列表），故R2为中转节点。\n- **Endpoint节点**：SRH的Segments包含R3（FC03:3）和R4（FC04:4），这些节点需处理SRH的Segments（执行Endpoint行为），结合路径，R3（或R4）为Endpoint节点（图中报文SRH的Segments含R3、R4，需处理该Segment）。\n匹配结果：源节点→R1，中转节点→R2，Endpoint节点→R3（或R4，依Segments列表处理逻辑）。",
    "images": [
      "images/image343.png",
      "images/image344.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第933题] 如图所示为某个部署了SR的广域承载网络，已知该网络通过控制器算路，请将网络技术与应用的位置进行匹配。",
    "pairs": [
      {
        "left": "BGP",
        "right": "用于CE（数据中心/企业分支）与PE的用户侧路由交互（图中位置1，CE - PE绿色链路），故BGP匹配1"
      },
      {
        "left": "BGP SR - Policy/PCEP",
        "right": "实现控制器（iMaster NCE）与网络设备（RR）的策略/路径计算协议交互（图中位置2，控制器到RR的虚线），故匹配2"
      },
      {
        "left": "MP - IBGP",
        "right": "承载网AS 65600内部，PE与RR的多协议内部BGP交互（图中位置3，PE到RR的红色链路），故匹配3"
      },
      {
        "left": "BGP - LS",
        "right": "网络设备（RR）向控制器分发链路状态信息（图中位置4，RR到控制器的虚线），故匹配4"
      }
    ],
    "explanation": "解析（AI生成）：解析：\n1. **BGP**：用于CE（数据中心/企业分支）与PE的用户侧路由交互（图中位置1，CE - PE绿色链路），故BGP匹配1。\n2. **BGP SR - Policy/PCEP**：实现控制器（iMaster NCE）与网络设备（RR）的策略/路径计算协议交互（图中位置2，控制器到RR的虚线），故匹配2。\n3. **MP - IBGP**：承载网AS 65600内部，PE与RR的多协议内部BGP交互（图中位置3，PE到RR的红色链路），故匹配3。\n4. **BGP - LS**：网络设备（RR）向控制器分发链路状态信息（图中位置4，RR到控制器的虚线），故匹配4。\n（易错提醒：BGP - LS侧重拓扑分发，MP - IBGP用于AS内IBGP，BGP SR - Policy/PCEP侧重策略交互，需结合场景区分。）",
    "images": [
      "images/image345.png",
      "images/image346.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第934题] 请将下列硬件模块和对应的功能配对",
    "pairs": [
      {
        "left": "因此正确配对为：主控板",
        "right": "负责整个系统的控制平面"
      },
      {
        "left": "接口板",
        "right": "提供不同的速率、不同传输介质的接口"
      },
      {
        "left": "交换网板",
        "right": "交换业务板间的流量"
      }
    ],
    "explanation": "解析（AI生成）：解析：首先明确各硬件模块的功能（“速泵”为“速率”笔误）：①主控板：负责整个系统的控制平面，管理系统控制逻辑与配置；②接口板：提供不同速率、不同传输介质的接口，实现设备与外部的连接；③交换网板：负责交换业务板间的流量，完成业务板间数据转发。因此正确配对为：主控板—负责整个系统的控制平面，接口板—提供不同的速率、不同传输介质的接口，交换网板—交换业务板间的流量。",
    "images": [
      "images/image347.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第935题] 请将下列BGP属性名称与其所属的属性分类对应起来",
    "pairs": [
      {
        "left": "Origin",
        "right": "公认必遵、LocalPreference"
      },
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：BGP属性分四类：公认必遵（必含）、公认任意（可选含）、可选过渡（可选且可传）、可选非过渡（可选且不传）。对应关系：Origin（起源）属公认必遵，描述路由来源；LocalPreference（本地优先级）属公认任意，用于AS内路由优选；MED（多出口鉴别器）属可选过渡，跨AS传递出口偏好；Aggregator（聚合者）属可选非过渡，记录聚合路由信息。图中连线（Origin→公认必遵、LocalPreference→公认任意、MED→可选过渡、Aggregator→可选非过渡）符合BGP属性分类规则。",
    "images": [
      "images/image348.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第936题] 请将下列VRRP状态与相应的工作机制匹配",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：VRRP中，Master（主设备）的工作机制：以虚拟MAC地址响应对虚拟IP地址的ARP请求（使终端获取虚拟MAC，将流量发往自身），并转发目的MAC地址为虚拟MAC地址的IP报文（处理发往虚拟网关的业务）。Backup（备份设备）的工作机制：不响应对虚拟IP地址的ARP请求（避免地址冲突），且丢弃目的MAC地址为虚拟MAC地址的IP报文（流量由Master处理，自身仅监听状态报文）。因此匹配：Master对应“以虚拟MAC地址响应对虚拟IP地址的ARP请求”“转发目的MAC地址为虚拟MAC地址的IP报文”；Backup对应“对虚拟IP地址的ARP请求，不做响应”“丢弃目的MAC地址为虚拟MAC地址的IP报文”。",
    "images": [
      "images/image349.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第937题] 如图所示的网络中需要部署用户准入认证，请在不同的认证点选择合适的认证方式",
    "pairs": [
      {
        "left": "MAC认证",
        "right": "无需客户端，基于MAC地址认证，适用于哑终端（如IP电话），故匹配认证点②（IP电话的GE0/0/3接口）"
      },
      {
        "left": "Portal认证",
        "right": "无客户端，通过网页认证，适用于无线终端（如手机、平板）等无客户端的接入场景，故匹配认证点③（无线AP下的终端）"
      },
      {
        "left": "正确匹配为：802.1X认证",
        "right": "①"
      },
      {
        "left": "正确匹配为",
        "right": "802.1X认证→①，MAC认证→②，Portal认证→③"
      }
    ],
    "explanation": "解析（AI生成）：解析：需根据认证方式的适用场景匹配认证点：\n- **802.1X认证**：需安装客户端软件，适用于可安装客户端的设备（如PC），故匹配认证点①（PC的GE0/0/2接口）。\n- **MAC认证**：无需客户端，基于MAC地址认证，适用于哑终端（如IP电话），故匹配认证点②（IP电话的GE0/0/3接口）。\n- **Portal认证**：无客户端，通过网页认证，适用于无线终端（如手机、平板）等无客户端的接入场景，故匹配认证点③（无线AP下的终端）。\n正确匹配为：802.1X认证→①，MAC认证→②，Portal认证→③。",
    "images": [
      "images/image350.png",
      "images/image351.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第938题] 请将OSPFv3 LSA与其传递范文对应起来",
    "pairs": [
      {
        "left": "AS - external - LSA",
        "right": "通告AS外部路由，传播范围为**自治系统范围**（覆盖整个OSPF自治系统）"
      },
      {
        "left": "Network - LSA",
        "right": "由DR生成，描述广播/NBMA网络链路，传播范围为**区域内部**（同一OSPF区域内传递）"
      },
      {
        "left": "Link - LSA",
        "right": "由路由器生成，描述本地链路的邻居/前缀，传播范围限于**本地链路范围**（仅同一链路的邻居间传递）"
      }
    ],
    "explanation": "解析（AI生成）：OSPFv3的LSA传播范围由功能决定：\n- **AS - external - LSA**：通告AS外部路由，传播范围为**自治系统范围**（覆盖整个OSPF自治系统）。\n- **Network - LSA**：由DR生成，描述广播/NBMA网络链路，传播范围为**区域内部**（同一OSPF区域内传递）。\n- **Link - LSA**：由路由器生成，描述本地链路的邻居/前缀，传播范围限于**本地链路范围**（仅同一链路的邻居间传递）。",
    "images": [
      "images/image352.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第939题] 如图所示，路由器均运行OSPF协议，Area2是完全末节区域，请将各区域包含的LSA的类型和区域ID进行匹配",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：解析：OSPF不同区域的LSA类型由区域属性决定：\n1. **Area2（完全末节区域）**：ABR（R2）过滤Type4（ASBR汇总）和Type5（外部LSA），仅保留Type1（路由器LSA）、Type2（网络LSA）、Type3（区域间汇总LSA，含默认路由），故匹配“Type1LSA、Type2LSA、Type3LSA”。\n2. **Area0（骨干区域）**：含Type1、Type2、Type3（区域间汇总）、Type4（ASBR汇总，通告R3位置）、Type5（外部LSA，R3引入的直连路由），故匹配“Type1LSA、Type2LSA、Type3LSA、Type4LSA、Type5LSA”。\n3. **Area1（普通区域）**：ABR（R2）传递Type1、Type2、Type3（区域间）、Type5（外部），故匹配“Type1LSA、Type2LSA、Type3LSA、Type5LSA”。\n4. **Area3（连接ASBR的区域）**：ABR（R3）传递Type1、Type2、Type3（区域间）、Type5（外部），故匹配“Type1LSA、Type2LSA、Type3LSA、Type5LSA”。\n（提醒：完全末节区域核心是过滤Type4、Type5，仅保留前三类LSA。）",
    "images": [
      "images/image353.png",
      "images/image354.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第940题] 如图所示，请将用户认证结果与对应的访问权限对应起来",
    "pairs": [
      {
        "left": "认证前",
        "right": "用户未认证，仅能访问认证前域（1）的基础服务（准入控制、DHCP、DNS等），故对应1"
      },
      {
        "left": "认证未通过或安全检查未通过",
        "right": "需进入隔离域（2）进行安全修复（病毒查杀、补丁更新），故对应2"
      },
      {
        "left": "认证通过",
        "right": "可访问认证后域（3）的办公、研发等业务数据，故对应3"
      },
      {
        "left": "对应关系为：认证前",
        "right": "1"
      },
      {
        "left": "对应关系为",
        "right": "认证前→1，认证未通过或安全检查未通过→2，认证通过→3"
      }
    ],
    "explanation": "解析（AI生成）：根据网络访问控制逻辑，各认证状态的访问权限对应如下：\n- 认证前：用户未认证，仅能访问认证前域（1）的基础服务（准入控制、DHCP、DNS等），故对应1。\n- 认证未通过或安全检查未通过：需进入隔离域（2）进行安全修复（病毒查杀、补丁更新），故对应2。\n- 认证通过：可访问认证后域（3）的办公、研发等业务数据，故对应3。\n对应关系为：认证前→1，认证未通过或安全检查未通过→2，认证通过→3。",
    "images": [
      "images/image355.png",
      "images/image356.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第941题] 请将以下DHCP攻击类型和相应解释配对",
    "pairs": [
      {
        "left": "DHCP饿死攻击**",
        "right": "攻击者持续大量向DHCP Server申请IP，导致无IP分配给正常用户"
      },
      {
        "left": "DHCP饿死攻击",
        "right": "攻击者持续大量申请IP，耗尽服务器地址池，使合法用户无法获取IP，对应“攻击者持续大量向DHCP Server申请IP，导致无IP分配给正常用户”"
      },
      {
        "left": "DHCP仿冒攻击**",
        "right": "攻击者仿冒DHCP Server回应DHCP Client"
      },
      {
        "left": "DHCP仿冒攻击",
        "right": "伪装成DHCP Server欺骗客户端，对应“攻击者仿冒DHCP Server回应DHCP Client”"
      },
      {
        "left": "中间人攻击**",
        "right": "攻击者通过攻击让交换机学习错误IP/MAC映射，窃取流量"
      },
      {
        "left": "中间人攻击",
        "right": "篡改交换机IP/MAC映射表窃取流量，对应“攻击者通过攻击让交换机学习错误IP/MAC映射，窃取流量”"
      },
      {
        "left": "DHCP报文泛洪攻击**",
        "right": "攻击者短时间内发大量DHCP报文"
      },
      {
        "left": "DHCP报文泛洪攻击",
        "right": "短时间发送海量DHCP报文拥塞设备，对应“攻击者短时间内发大量DHCP报文”"
      },
      {
        "left": "配对依据为攻击核心行为",
        "right": "饿死攻击耗尽地址、仿冒攻击伪装服务器、中间人攻击篡改映射、泛洪攻击拥塞设备"
      }
    ],
    "explanation": "解析（AI生成）：DHCP攻击类型配对解析：\n- **DHCP饿死攻击**：攻击者持续大量申请IP，耗尽服务器地址池，使合法用户无法获取IP，对应“攻击者持续大量向DHCP Server申请IP，导致无IP分配给正常用户”。\n- **DHCP仿冒攻击**：伪装成DHCP Server欺骗客户端，对应“攻击者仿冒DHCP Server回应DHCP Client”。\n- **中间人攻击**：篡改交换机IP/MAC映射表窃取流量，对应“攻击者通过攻击让交换机学习错误IP/MAC映射，窃取流量”。\n- **DHCP报文泛洪攻击**：短时间发送海量DHCP报文拥塞设备，对应“攻击者短时间内发大量DHCP报文”。\n配对依据为攻击核心行为：饿死攻击耗尽地址、仿冒攻击伪装服务器、中间人攻击篡改映射、泛洪攻击拥塞设备。",
    "images": [
      "images/image357.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第942题] 请将以下命令与其作用对应起来",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：根据图片红色箭头连线，命令与作用的对应关系为：\n- `arp broadcast-suppress enable` → **ARP本地代理**\n- `arp collect host enable` → **ARP广播抑制**\n- `arp-proxy enable` → **分布式网关**\n- `arp distribute-gateway enable` → **主机信息搜集**\n（注：从命令命名逻辑分析，实际功能对应应为：`arp broadcast-suppress enable`（ARP广播抑制，含`broadcast-suppress`关键字）、`arp collect host enable`（主机信息搜集，含`collect host`关键字）、`arp-proxy enable`（ARP本地代理，含`proxy`关键字）、`arp distribute-gateway enable`（分布式网关，含`distribute-gateway`关键字），需结合关键字理解作用。）",
    "images": [
      "images/image358.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第943题] SRv6 SID有很多类型，不同类型的SRv6 SID代表不同的功能。请将SRv6 SID类型和其功能进行匹配",
    "pairs": [
      {
        "left": "故正确匹配为：End SID",
        "right": "用于标识网络中的某个目的节点"
      },
      {
        "left": "End.X SID",
        "right": "用于标识网络中的某条链路"
      },
      {
        "left": "End.DT4 SID",
        "right": "用于标识网络中的某个IPv4 VPN实例"
      },
      {
        "left": "End.DT6 SID",
        "right": "用于标识网络中的某个IPv6 VPN实例"
      }
    ],
    "explanation": "解析（AI生成）：SRv6 SID各类型功能及匹配：End SID用于标识网络中的目的节点；End.X SID用于标识网络中的某条链路；End.DT4 SID用于标识IPv4 VPN实例；End.DT6 SID用于标识IPv6 VPN实例。故正确匹配为：End SID→用于标识网络中的某个目的节点，End.X SID→用于标识网络中的某条链路，End.DT4 SID→用于标识网络中的某个IPv4 VPN实例，End.DT6 SID→用于标识网络中的某个IPv6 VPN实例。易错提醒：注意区分End.DT4（IPv4 VPN）和End.DT6（IPv6 VPN）的VPN版本。",
    "images": [
      "images/image359.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第944题] OSPFv2是运行在IPv4网络的IGP， 0SPFv3是运行在IPv6网络的IGP。 OSPFv3与OSPFv2相比，具有类似的LSA，但是功能略有区别。以下是关于OSPFv3 LSA功能的描述，请将LSA拖拽到正确的LSA功能栏",
    "pairs": [
      {
        "left": "**AS-External-LSA**",
        "right": "描述到达AS外部的路由"
      },
      {
        "left": "**Intra-Area-Prefix-LSA**",
        "right": "描述区域内某个IPv6地址前缀"
      },
      {
        "left": "**Link-LSA**",
        "right": "描述本接口的链路本地地址和IPv6前缀列表"
      },
      {
        "left": "**Inter-Area-Router-LSA**",
        "right": "描述到达ASBR的路由"
      },
      {
        "left": "**Inter-Area-Prefix-LSA**",
        "right": "描述网段信息，并依赖拓扑信息进行路由计算"
      }
    ],
    "explanation": "解析（AI生成）：OSPFv3各LSA功能对应如下：\n1. **AS-External-LSA**：传递AS外部的IPv6路由，对应“描述到达AS外部的路由”。\n2. **Intra-Area-Prefix-LSA**：通告区域内的IPv6地址前缀，对应“描述区域内某个IPv6地址前缀”。\n3. **Link-LSA**：描述本接口的链路本地地址、IPv6前缀列表，对应“描述本接口的链路本地地址和IPv6前缀列表”。\n4. **Inter-Area-Router-LSA**：通告ASBR的位置（到达ASBR的路由），对应“描述到达ASBR的路由”。\n5. **Inter-Area-Prefix-LSA**：传递区域间的网段信息（含拓扑信息），用于路由计算，对应“描述网段信息，并依赖拓扑信息进行路由计算”。\n（注：OSPFv3通过不同LSA类型精准传递IPv6网络的路由与拓扑信息，需区分各LSA的作用域与功能。）",
    "images": [
      "images/image360.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第945题] 华为SD-VAN解决方案架构有三种通道，请将图中的通道和其名称一一对应",
    "pairs": [
      {
        "left": "控制通道",
        "right": "负责控制平面信令（如BGP、标签分发），由RR（路由反射器，控制平面组件）与EDGE设备通信，对应图中编号$$ 2 $$（RR到EDGE的虚线连接）"
      },
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：华为SD - WAN解决方案的三类通道功能及对应关系如下：\n- **管理通道**：负责设备管理（配置、监控等），由iMaster NCE（管理控制器）与EDGE设备（总部/分支）通信，对应图中编号$$ 1 $$（iMaster到EDGE的虚线连接）。\n- **控制通道**：负责控制平面信令（如BGP、标签分发），由RR（路由反射器，控制平面组件）与EDGE设备通信，对应图中编号$$ 2 $$（RR到EDGE的虚线连接）。\n- **数据通道**：负责用户业务数据转发，由总部EDGE到分支EDGE的隧道（如MPLS/Internet上的转发）通信，对应图中编号$$ 3 $$（EDGE之间的实线连接）。\n因此，通道与编号的对应为：管理通道$$ \\leftrightarrow 1 $$、控制通道$$ \\leftrightarrow 2 $$、数据通道$$ \\leftrightarrow 3 $$。",
    "images": [
      "images/image361.png",
      "images/image362.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第946题] 如图所示，请完成图中基于DiffServ模型的QoS基本处理流程",
    "pairs": [
      {
        "left": "分类",
        "right": "监管"
      },
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：DiffServ QoS流程填充逻辑：①为**流分类和标记**（识别流量类别、标记DSCP）；②为**流量监管（CAR）**（检查流量速率合规性）；③为**流量整形**（平滑流量速率）；④为**拥塞避免**（如WRED，预防队列溢出）；⑤为**拥塞管理**（队列调度，保障高优先级流量转发）。流程顺序（分类→监管→整形→队列防溢→调度）匹配模块功能，确保流量按服务等级有序转发。",
    "images": [
      "images/image363.png",
      "images/image364.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第947题] 某园区网络通过iMaster NCE Campus部署了业务随行功能，请分辨以下哪些步骤是管理员完成的，哪些是控制器自动部署的，并将左侧的管理员或控制器，拖拽至右侧对应执行的步骤上",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：在iMaster NCE Campus业务随行部署中，**管理员**需手动执行“定义策略控制矩阵”“定义安全组”：前者规划业务访问策略规则，后者划分安全域；**控制器**自动执行“下发IP - Group表项”：根据配置自动推送IP - Group配置到设备，无需人工干预。",
    "images": [
      "images/image365.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第948题] 如图所示，如果这个数据包描述的是采用隧道模式的IPSec报文，请将相应的报文头拖入正确的位置",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：IPSec隧道模式下，报文头部顺序为：位置1是**New IP Header**（外层IP头，路由隧道两端）；位置2为**AH Header**（若启用AH认证，位于ESP头前）；位置3为**ESP Header**（处理加密/认证）；位置4为**Raw IP Header**（原IP头，承载原始网络层路由）。此结构通过“外层新IP头封装、内部保留原IP头”，实现隧道通信的安全与路由分离，匹配ESP隧道模式的封装逻辑（新IP头封装IPSec报文，内部包含原IP数据包及安全头部）。",
    "images": [
      "images/image366.png",
      "images/image367.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第949题] VGMP定义了多种报文类型，请将报文类型和作用进行匹配",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：VGMP报文：用于两台防火墙（FW）间交互VGMP组信息，协商主备状态；HRP数据报文：用于主备设备间的数据备份；HRP心跳报文：用于探测对端设备是否处于工作状态；HRP链路探测报文：用于探测对端设备的心跳口能否正常接收本端设备的报文。各报文依功能实现双机热备的状态协商、数据同步与链路检测。",
    "images": [
      "images/image368.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第950题] HTTP状态码(HTTP Status Code)是服务器响应状态的3位数字码，用于向客户端返回操作结果。请将HTTP状态码和原因短语进行匹配",
    "pairs": [
      {
        "left": "1XX",
        "right": "请求被接收"
      },
      {
        "left": "2XX",
        "right": "请求成功"
      },
      {
        "left": "3XX",
        "right": "进一步操作需要被执行"
      },
      {
        "left": "4XX",
        "right": "请求错误"
      },
      {
        "left": "5XX",
        "right": "服务端错误"
      }
    ],
    "explanation": "解析（AI生成）：HTTP状态码按功能分为5类，正确匹配如下：\n- **1XX（信息类）**：服务器已接收请求，需客户端后续操作（如100 Continue），对应“请求被接收”。\n- **2XX（成功类）**：请求被服务器成功处理（如200 OK），对应“请求成功”。\n- **3XX（重定向类）**：需客户端进一步操作（如跳转）才能完成请求（如301重定向），对应“进一步操作需要被执行”。\n- **4XX（客户端错误类）**：客户端请求存在错误（如404 Not Found），对应“请求错误”。\n- **5XX（服务器错误类）**：服务器处理请求时出错（如500内部错误），对应“服务端错误”。\n（图中错误连线需按上述逻辑纠正，核心依据各状态码的功能定义。）",
    "images": [
      "images/image369.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第951题] NETCONF定义了一系列操作，请将NETCONF操作和功能做对应匹配",
    "pairs": [
      {
        "left": "匹配关系为：",
        "right": "查询配置数据"
      },
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：NETCONF各操作功能如下：用于查询配置数据；可修改、创建、删除配置数据；能放弃中未提交的配置数据；用于查询设备当前运行的配置和状态数据。匹配关系为：→查询配置数据，→修改、创建、删除配置数据，→放弃中未提交的配置数据，→查询设备当前运行的配置和状态数据。",
    "images": [
      "images/image370.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第952题] 如图所示为某企业广域承载网络，请为图中四条链路规划合适的Metric值",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：Metric（如OSPF链路开销）反映路径优劣，数值越小路径优先级越高。结合网络架构：链路②（PE - P）为主用传输链路，分配最小Metric（10）；链路③（PE - PE）为次优路径，Metric设为100；链路①（P - P横向链路）为第三优先级，Metric设为500；链路④（P - RR链路）为高开销/备份链路，Metric设为1000。最终规划：链路①Metric=500，链路②Metric=10，链路③Metric=100，链路④Metric=1000。",
    "images": [
      "images/image371.png",
      "images/image372.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第953题] 请将以下认证技术与其适用场景对应起来",
    "pairs": [
      {
        "left": "**Portal认证**",
        "right": "流动性较大，终端类型复杂的访客用户网络认证"
      },
      {
        "left": "**MAC认证**",
        "right": "打印机、传真机等哑终端接入认证的场景"
      },
      {
        "left": "**802.1X认证**",
        "right": "对安全要求较高的办公用户的网络认证"
      }
    ],
    "explanation": "解析（AI生成）：解析：需结合各认证技术的特点与场景需求匹配：\n1. **Portal认证**：通过网页认证，无需预装客户端，适合**流动性较大、终端类型复杂的访客用户**（如临时访客的手机、电脑等多样终端），故对应“流动性较大，终端类型复杂的访客用户网络认证”。\n2. **MAC认证**：基于设备MAC地址，无需用户交互，适合**哑终端（如打印机、传真机）**（此类设备无认证客户端，MAC认证可自动识别接入），故对应“打印机、传真机等哑终端接入认证的场景”。\n3. **802.1X认证**：基于端口的访问控制，需客户端支持，可提供严格身份与安全管控，适合**安全要求高的办公用户**（如企业办公网络，需精准管控接入权限），故对应“对安全要求较高的办公用户的网络认证”。\n易错提醒：注意区分哑终端（无交互能力）、办公用户（需强安全）、访客（终端多样流动）的场景差异，避免混淆认证逻辑。",
    "images": [
      "images/image373.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第954题] 请将告警级别与故障的重要程度、应对措施对应起来",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：告警级别与故障应对的对应逻辑基于故障影响程度和处理优先级：\n- Critical（严重）：故障影响服务可用性，需**必须立刻处理**（服务不可用后果严重，优先级最高）；\n- Major（主要）：故障影响服务质量，需**工作时间内必须立刻处理**（影响用户体验，需快速响应）；\n- Minor（次要）：故障对服务有威胁，需**适时处理**（潜在风险，需关注时机）；\n- Warning（警告）：故障为潜在错误，需**日常优化时处理**（风险低，日常维护时解决）。\n该对应体现了故障严重程度与处理紧迫性的关联，Critical优先级最高，Warning优先级最低。",
    "images": [
      "images/image374.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第955题] HTTP请求行由三个字段组成，请按先后顺序组成完整的HTTP请求消息",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：HTTP请求行由**请求方法**、**URI**、**协议版本**按先后顺序组成（状态码属于响应行，不属请求行）。结合图示：1填请求方法（如GET/POST），2填URI（请求的资源标识符），3填协议版本（如HTTP/1.1）。完整请求消息的请求行格式为：`请求方法 空格 URI 空格 协议版本 回车符+换行符`，后续依次是头部字段（“头部字段名: 值”+回车换行）、数据。\n易错提醒：请求行不含状态码，状态码是HTTP响应行的组成部分。",
    "images": [
      "images/image375.png",
      "images/image376.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第956题] 请将华为云园区网络解决方案组件与其作用一一对应",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：iMaster NCE - Campus是配置和管理平台，负责园区网络的配置与管理；CloudCampus APP是手机端APP，提供网规、部署、验收、运维等全生命周期管理功能；注册查询中心为设备提供云管理平台地址，支撑设备注册；iMaster NCE - CampusInsight是网络分析系统，借助大数据分析实现故障主动预测。",
    "images": [
      "images/image377.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第957题] 请将IPsec可提供的功能和相对应的功能说明进行匹配",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：IPsec功能与说明的匹配逻辑：①数据来源验证：通过验证发送方身份合法性实现，匹配“接收方验证发送方身份是否合法”；②数据加密：实现发送方加密、接收方解密数据的过程，匹配“发送方对数据进行加密，接收方对数据进行解密”；③数据完整性：通过验证数据是否被篡改实现，匹配“接收方对接收的数据进行验证，以判定报文是否被篡改”；④抗重放：防止重复数据包攻击，接收方拒绝重复包，匹配“接收方拒绝重复的数据包”。",
    "images": [
      "images/image378.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第958题] CE1和CE2属于同一个VPN，VPN实例的名字为vpna。通过OptionC方式一实现CE1和CE2互通。为实现该需求，请将以下命令行与设备编号进行匹配",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：在VPN Option C部署中，各设备命令匹配逻辑如下：\n- **ASBR-PE1**（AS100）需配置邻居PE1（10.0.1.1）的AS号，匹配命令 `peer 10.0.1.1 as-number 100`（设置邻居AS为100）。\n- **PE1**（AS100）与PE2（10.0.6.6，AS200）为EBGP邻居，需调整EBGP最大跳数（默认hop=1），匹配命令 `peer 10.0.6.6 EBGP-max-hop 10`。\n- **ASBR-PE2**（AS200）与PE1（10.0.1.1，AS100）为EBGP邻居，需调整EBGP最大跳数，匹配命令 `peer 10.0.1.1 EBGP-max-hop 10`。\n- **PE2**（AS200）与ASBR-PE1（10.0.34.3）为MP-EBGP邻居，需协商标签路由能力，匹配命令 `peer 10.0.34.3 label-route-capability`（使能标签路由协商）。\n（注：图中箭头显示交叉匹配，核心逻辑为：PE与ASBR-PE间需协商标签路由/调整EBGP跳数，ASBR-PE间需设置邻居AS号。）",
    "images": [
      "images/image379.png",
      "images/image380.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第959题] EVPN支持通过多种服务模式来接入用户网络，请将服务模式和适用场景进行匹配",
    "pairs": [
      {
        "left": "Port Based",
        "right": "物理接口直接绑定普通EVPN实例，接口与实例直接关联，无需子接口或VLAN细分"
      },
      {
        "left": "VLANBased",
        "right": "物理接口划分子接口，子接口关联VLAN并映射到BD，每个BD绑定独立EVPN实例，通过子接口和BD细分业务"
      },
      {
        "left": "VLAN Bundle",
        "right": "以VLAN划分用户，不同VLAN绑定**不同**EVPN实例，可承载二层/三层业务（VLAN与实例一一对应）"
      },
      {
        "left": "VLAN - Aware Bundle",
        "right": "以VLAN划分用户，不同VLAN绑定**同一**EVPN实例，可承载二层/三层业务（多VLAN共享实例）"
      }
    ],
    "explanation": "解析（AI生成）：该题是EVPN服务模式与适用场景的匹配，各模式逻辑如下：\n- **Port Based**：物理接口直接绑定普通EVPN实例，接口与实例直接关联，无需子接口或VLAN细分。\n- **VLANBased**：物理接口划分子接口，子接口关联VLAN并映射到BD，每个BD绑定独立EVPN实例，通过子接口和BD细分业务。\n- **VLAN Bundle**：以VLAN划分用户，不同VLAN绑定**不同**EVPN实例，可承载二层/三层业务（VLAN与实例一一对应）。\n- **VLAN - Aware Bundle**：以VLAN划分用户，不同VLAN绑定**同一**EVPN实例，可承载二层/三层业务（多VLAN共享实例）。\n（核心区别：实例绑定数量、接口处理方式，如“VLAN Bundle”是“一VLAN一实例”，“VLAN - Aware Bundle”是“多VLAN一实例”。）",
    "images": [
      "images/image381.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第960题] 请按照割接执行步骤排序",
    "pairs": [
      {
        "left": "左边框与右边序号的对应关系为：安装新设备并配置",
        "right": "将业务割接"
      },
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：割接执行步骤的逻辑顺序为：\n1. **安装新设备并配置**（前提，完成新设备的安装与配置）；\n2. **将业务从老设备割接到新设备**（配置后迁移业务至新设备）；\n3. **在新设备上面执行业务检查**（验证新设备业务功能）；\n4. **割接完成后，观察网络在新设备的状态**（监控新设备整体网络状态）；\n5. **确保新设备的业务运行正常后老设备下线**（确认新设备稳定后，下线老设备）。\n结合图片箭头连接，左边框与右边序号的对应关系为：安装新设备并配置→1、将业务割接→2、业务检查→3、状态观察→4、老设备下线→5。",
    "images": [
      "images/image382.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第961题] 如图所示，为了实现Site1和Site 2之间的流量通过Hub-CE，现已经配置了两台Spoke-PE上的VPN实例。Hub-PE上需要创建两个VPN实例，实例VPN_in用于接收Spoke-PE发来的路由，实例VPN_out用于向Spoke-PE发布路由，请分别选择实例VPN_in的Import RT和VPN_out的Export RT",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：解析：在VPN路由交换中，Route Target（RT）的**Import RT**用于筛选接收的路由（需匹配发送方的Export RT），**Export RT**用于标记发送的路由（需匹配接收方的Import RT）。结合图中交叉箭头与Spoke - PE的RT配置：Spoke - PE发送路由的Export RT为100:1，故Hub - PE的VPN_in（接收路由）的Import RT需设为100:1以匹配；Hub - PE发送路由的Export RT需设为200:1，以匹配Spoke - PE的Import RT（200:1）。因此，VPN_in的Import RT为100:1，VPN_out的Export RT为200:1。\n（易错提醒：RT匹配逻辑为“接收方Import RT = 发送方Export RT”，需注意方向对应。）",
    "images": [
      "images/image383.png",
      "images/image384.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第962题] SR-MPLS中的Segment是节点针对所收到的数据包要执行的指令，请将Segment的类型与功能进行匹配",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：SR - MPLS中，Segment类型与功能的正确匹配为：①Prefix Segment（前缀段）用于标识网络中的某个目的地址前缀（对应目的地址的前缀路由）；②Adjacency Segment（邻接段）用于标识网络中的某个邻接（对应节点间的直接连接）；③Node Segment（节点段）用于标识特定的节点（指定数据包的目标节点）。可通过“前缀 - 目的前缀、邻接 - 链路邻接、节点 - 特定节点”的口诀辅助记忆，避免功能混淆。",
    "images": [
      "images/image385.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第963题] NETCONF协议在概念上可以划分为4层。对于NETCONF协议框架，请将各层和图示对应。",
    "pairs": [
      {
        "left": "安全传输层",
        "right": "负责安全传输（如SSH、BEEP等），对应图示**1层**（含SSH、BEEP的层）；"
      },
      {
        "left": "消息层",
        "right": "处理RPC（、）和通知（），对应图示**2层**（含、、的层）；"
      },
      {
        "left": "内容层",
        "right": "定义配置操作（如、），对应图示**3层**（含、的层）；"
      },
      {
        "left": "操作层",
        "right": "管理配置/通知数据（Config&amp;Status Data、notification Data），对应图示**4层**（含这两类数据的层）"
      }
    ],
    "explanation": "解析（AI生成）：NETCONF协议四层与图示的对应关系为：\n1. 安全传输层：负责安全传输（如SSH、BEEP等），对应图示**1层**（含SSH、BEEP的层）；\n2. 消息层：处理RPC（、）和通知（），对应图示**2层**（含、、的层）；\n3. 内容层：定义配置操作（如、），对应图示**3层**（含、的层）；\n4. 操作层：管理配置/通知数据（Config&amp;Status Data、notification Data），对应图示**4层**（含这两类数据的层）。\n易错提醒：可通过“安消内操，1234”（安全传输、消息、内容、操作，对应1 - 4层）辅助记忆。",
    "images": [
      "images/image386.png",
      "images/image387.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第964题] 某网络中所有路由器开启了基于OSPF的SR-MPLS TE功能，其中控制器下发给R1的标签栈含4层标签，请将标签值拖拽入标签栈中正确的位置。",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析：如图",
    "images": [
      "images/image388.png",
      "images/image389.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第965题] 对于基于gRPC的Telemetry协议而言，数据模型层由三个部分组成。RPC层，Telemetry层，业务数据层。请将相应的proto文件和其所在的层次进行匹配",
    "pairs": [
      {
        "left": "RPC层",
        "right": "负责远程过程调用的协议定义，对应`huawei - grpc - dialin.proto`（定义gRPC拨号等RPC相关协议）"
      },
      {
        "left": "Telemetry层",
        "right": "处理遥测数据的协议，对应`huawei - telemetry.proto`（定义遥测逻辑与数据格式）"
      },
      {
        "left": "业务数据层",
        "right": "处理具体业务（如调试）数据，对应`huawei - debug.proto`（定义调试等业务数据结构）"
      }
    ],
    "explanation": "解析（AI生成）：基于gRPC的Telemetry协议数据模型层的proto文件匹配如下：\n- RPC层：负责远程过程调用的协议定义，对应`huawei - grpc - dialin.proto`（定义gRPC拨号等RPC相关协议）。\n- Telemetry层：处理遥测数据的协议，对应`huawei - telemetry.proto`（定义遥测逻辑与数据格式）。\n- 业务数据层：处理具体业务（如调试）数据，对应`huawei - debug.proto`（定义调试等业务数据结构）。\n（易错提醒：需区分各层功能，RPC层是通信协议，Telemetry层是遥测逻辑，业务数据层是具体业务数据。）",
    "images": [
      "images/image390.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第966题] 华为云园区网络解决方案具有多种应用场景，iMaster NCE-Campus针对这些应用场景提供了相应的API接口，请将以下应用场景和iMasterNCE-Campus开放的API接口进行匹配",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：根据iMaster NCE - Campus的功能逻辑：①认证授权场景需第三方协同完成权限管理，匹配**三方认证API**；②网络运维涉及基础网络的配置、监控等，匹配**基础网络API**；③位置服务场景提供定位、轨迹等能力，匹配**位置服务API**；④人群画像属于网络增值业务（如用户行为分析），匹配**增值业务API**。通过场景需求与API功能的对应关系，完成精准匹配。",
    "images": [
      "images/image391.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第967题] 如图所示，有一个包含三层标签头部的报文，请分别选取图中X、Y、Z字段对应的取值(十进制)",
    "pairs": [
      {
        "left": "Ethernet Header",
        "right": "Label1"
      },
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：解析：MPLS标签头格式为“Label（20位）+ EXP（3位）+ S（1位，栈底标识）+ TTL（8位）”。S位用于标识是否为栈底：若有多层标签，**栈底标签（最靠近IP头的内层标签）的S=1**，上层标签的S=0。\n结合报文结构（Ethernet Header→Label1→Label2→Label3→IP Header），标签栈顺序为：Label1（栈顶，外层）、Label2（中间）、Label3（栈底，内层）。因此：\n- Label3（栈底）的S位（X）：$$ X=1 $$（栈底，S=1）；\n- Label2（中间层）的S位（Y）：$$ Y=0 $$（非栈底，S=0）；\n- Label1（栈顶）的S位（Z）：$$ Z=0 $$（非栈底，S=0）。",
    "images": [
      "images/image392.png",
      "images/image393.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第968题] 通过iMaster NCE Campus部署的虚拟化园区网络场景中，我们需要通过以下步骤完成一个虚拟化园区网络的管理与部署。请将以下步骤排序",
    "pairs": [
      {
        "left": "：虚拟化园区网络部署遵循“规划",
        "right": "设计"
      },
      {
        "left": "站点设计",
        "right": "2"
      },
      {
        "left": "设备管理",
        "right": "3"
      },
      {
        "left": "Fabric管理",
        "right": "4"
      },
      {
        "left": "VN管理",
        "right": "5"
      },
      {
        "left": "业务部署",
        "right": "6"
      }
    ],
    "explanation": "解析（AI生成）：虚拟化园区网络部署遵循“规划→设计→设备→Fabric→VN→业务”的逻辑：①**网络规划**（确定架构、IP等）→ 1；②**站点设计**（设计拓扑、设备位置）→ 2；③**设备管理**（添加/配置设备）→ 3；④**Fabric管理**（构建网络织物）→ 4；⑤**VN管理**（管理虚拟网络）→ 5；⑥**业务部署**（部署业务策略）→ 6。因此模块与数字的正确连线为：网络规划→1，站点设计→2，设备管理→3，Fabric管理→4，VN管理→5，业务部署→6。",
    "images": [
      "images/image394.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第969题] 基于VXLAN的虚拟化园区网络规划，需要考虑三个主要模块设计，包括：Underlay网络设计、Fabric设计、Overlay网络设计。请将下方左侧的模块，拖拽至右侧对应的当前模块具体要考虑的事情",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：基于VXLAN的虚拟化园区网络模块与设计项的对应关系如下：\n- Underlay网络设计（基础网络层）：负责基础网络的架构与自动化，对应**LAN自动化设计**（自动化部署基础网络）、**网络架构设计**（规划基础网络拓扑）。\n- Fabric设计（虚拟网络架构层）：负责虚拟网络的边界与外部互联，对应**Border节点设计**（管理虚拟网络边界）、**与外部网络互联设计**（实现虚拟网络对外连接）。\n- Overlay网络设计（虚拟网络业务层）：负责虚拟网络的接入与互访，对应**VN接入设计**（虚拟机接入虚拟网络）、**VN间互访设计**（虚拟机间虚拟网络互访）。",
    "images": [
      "images/image395.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第970题] 华为网络设备OPS (Open Prorarmability System. 开放可编程系统)功能的Python脚本使用HTTP方法访问网络设备的管理对象，请将HTTP方法拖动并对应其作用",
    "pairs": [
      {
        "left": "GET",
        "right": "执行**查询操作**，获取指定管理对象的信息"
      },
      {
        "left": "POST",
        "right": "执行**创建操作**，提交数据以创建新的管理对象"
      },
      {
        "left": "PUT/PATCH",
        "right": "执行**修改操作**（PUT全量更新，PATCH增量更新），修改指定管理对象的内容"
      },
      {
        "left": "DELETE",
        "right": "执行**删除操作**，删除指定的管理对象"
      },
      {
        "left": "HEAD",
        "right": "获取管理对象的元数据（如响应头），不返回资源内容（图中操作无对应，主要关注核心操作）"
      }
    ],
    "explanation": "解析（AI生成）：在华为OPS中，Python脚本通过HTTP方法访问管理对象的作用如下：\n- **GET**：执行**查询操作**，获取指定管理对象的信息。\n- **POST**：执行**创建操作**，提交数据以创建新的管理对象。\n- **PUT/PATCH**：执行**修改操作**（PUT全量更新，PATCH增量更新），修改指定管理对象的内容。\n- **DELETE**：执行**删除操作**，删除指定的管理对象。\n- **HEAD**：获取管理对象的元数据（如响应头），不返回资源内容（图中操作无对应，主要关注核心操作）。\n图中红色叉为错误连线，需按上述逻辑调整对应关系。",
    "images": [
      "images/image396.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第971题] 网络准入控制的工作流程如图所示请将步骤与顺序编号一对应。",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析（AI生成）：解析：网络准入控制流程逻辑为：①用户终端发起**用户身份认证请求**（步骤1）；②网络准入设备向准入服务器**传递用户身份信息**（步骤2）；③准入服务器对用户身份**验证**（步骤3）；④准入服务器向设备下发**用户策略授权**（步骤4）。对应关系：1-用户身份认证请求，2-用户身份信息传递，3-用户身份验证，4-用户策略授权。",
    "images": [
      "images/image397.png",
      "images/image398.png"
    ]
  },
  {
    "type": "drag",
    "q": "[第972题] 【添加客服薇信：est258258】 享受华为认证HCIA/IP/IE和售前HCSA/SP/SE折扣价考试券，只限薇信交流懂的来！",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析：【添加客服薇信：est258258】 享受华为认证HCIA/IP/IE和售前HCSA/SP/SE折扣价考试券，只限薇信交流懂的来！",
    "images": []
  },
  {
    "type": "drag",
    "q": "[第973题] 【添加客服薇信：est258258】 享受华为认证HCIA/IP/IE和售前HCSA/SP/SE折扣价考试券，只限薇信交流懂的来！",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析：【添加客服薇信：est258258】 享受华为认证HCIA/IP/IE和售前HCSA/SP/SE折扣价考试券，只限薇信交流懂的来！",
    "images": []
  },
  {
    "type": "drag",
    "q": "[第974题] 【添加客服薇信：est258258】 享受华为认证HCIA/IP/IE和售前HCSA/SP/SE折扣价考试券，只限薇信交流懂的来！",
    "pairs": [
      {
        "left": "配置项 A",
        "right": "目标区域 1"
      },
      {
        "left": "配置项 B",
        "right": "目标区域 2"
      }
    ],
    "explanation": "解析：【添加客服薇信：est258258】 享受华为认证HCIA/IP/IE和售前HCSA/SP/SE折扣价考试券，只限薇信交流懂的来！",
    "images": []
  }
];
