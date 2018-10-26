import {
	getTree,
	getTreeMessage,
	createNewDirction,
	getType,
	updataDirction,
	delectDirction
} from '@/api/direction'

const direction = {
		state: {
			treeData: [],
			tableData: []
		},

		mutations: {
			SET_TREEDATA: (state, data) => {
				state.treeData = data
			},
			SET_TABLEDATA: (state, data) => {
				state.tableData = data
			}
		},

		actions: {
			//获取数据字典节点信息
			GetTree({
				commit
			}) {
				return new Promise((resolve, reject) => {
					getTree().then(response => {
						const data = response.data
						console.log(response)
						commit('SET_TREEDATA', data)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//获取数据字典详细信息
			GetTreeMessage({
				commit
			}, id) {
				return new Promise((resolve, reject) => {
					getTreeMessage(id).then(response => {
						const data = response.data
						console.log(response)
						commit('SET_TABLEDATA')
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//删除
			Delect({
				dispath
			}, id) {
				return new Promise((resolve, reject) => {
					delectDirction(id).then(() => {
						dispath('GetTree')
						dispath('GetTreeMessage', id)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//更新
			Update({
				dispath
			}, data) {
				return new Promise((resolve, reject) => {
					updataDirction(data).then(() => {
						dispath('GetTree')
						dispath('GetTreeMessage', data.id)
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			//新建
			CreateNew({
				dispath
			}, data) {
				return new Promise((resolve, reject) => {
						createNewDirction(data).then(() => {
							dispath('GetTree')
							dispath('GetTreeMessage', data.id)
							resolve()
						}).catch(error => {
							reject(error)
						})
					}
				}
			}

			export default direction
