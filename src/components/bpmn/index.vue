<template>
	<div class="containers" ref="content">
		<div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
		<el-button class="save" type="primary" @click="save" :disabled="!xmlStr">新增保存</el-button>
	</div>
</template>
<script>
	// 引入相关的依赖
  import BpmnViewer from 'bpmn-js'
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
		
export default {
	data() {
		return {
			id: null,
			//bpmn模型	
			bpmnModeler: null,	
			container: null,
			//画图板	
			canvas: null,
			xmlStr: null,
			processName: '',
		}
	},
	methods: {
		createNewDiagram() {
			const newXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\" id=\"sample-diagram\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\r\n  <bpmn2:process id=\"Process_1\" name=\"" + this.processName + "\" isExecutable=\"false\">\r\n    <bpmn2:startEvent id=\"StartEvent_1\"/>\r\n  </bpmn2:process>\r\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\r\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\">\r\n      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\r\n        <dc:Bounds height=\"36.0\" width=\"36.0\" x=\"412.0\" y=\"240.0\"/>\r\n      </bpmndi:BPMNShape>\r\n    </bpmndi:BPMNPlane>\r\n  </bpmndi:BPMNDiagram>\r\n</bpmn2:definitions>";
			
			//导入XML文件
			this.bpmnModeler.importXml(newXml, (err) => {
				if(err) {
					
				}
			})
			// 当图发生改变的时候会调用这个函数，这个data就是图的xml
      setEncoded(link, name, data) {
        // 把xml转换为URI，下载要用到的
        //var encodedData = encodeURIComponent(data);
        // 获取到图的xml，保存就是把这个xml提交给后台
        this.xmlStr = data;
        // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
//        if (data) {
//          link.className = 'active'
//          link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData;
//          link.download = name;
//        } else {
//        }
      },
			// 保存修改操作
      save() {
       // 调用API接口
        saveBpmnData(id, xmlStr).then(res => {
//          console.log(res)
//          console.log(this.xmlStr)
         })
      },
			// 从用户输入获取流程名称
      getProcessName() {
        this.$prompt('请输入流程名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消创建'
        }).then(({ value }) => {
          if(value === ''){
            this.$message({
              type: 'error',
              message: '流程名字不能为空'
            });
            this.getProcessName()
          }
          else {
            this.processName = value;
            this.createNewDiagram();
          }

        }).catch(() => {
          // this.back()
        });
      }
		}
	}
}
</script>

<style lang="scss" scoped>
  /*左边工具栏以及编辑节点的样式*/
  @import 'bpmn-js/dist/assets/diagram-js.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  /*右边工具栏样式*/
  @import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
  .containers{
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
  .canvas{
    width: 100%;
    height: 100%;
  }
  .panel{
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
  }
</style>
