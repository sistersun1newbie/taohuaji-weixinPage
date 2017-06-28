<template>
	<div>
		<div style="height: 1px;">&nbsp;</div>
		<group style="">
			<form-preview :header-label="formhead.headerlable" :header-value="formhead.headervalue" :body-items="list"></form-preview>
		</group>
	</div>
</template>
<script>
	import { Cell,  Group, XButton, FormPreview } from 'vux'

	export default {
		data() {
			return {
				formhead:{
					headerlable:'快递号',
					headervalue:'612479999812'
				},
				list: [{
					label: '快递号',
					value: '612479999812'
				}, {
					label: '送至',
					value: '山东济南市历下区山东省济南市历下区天辰路677号l吉美乐大厦 504'
				}, {
					label: '联系人',
					value: '杨伟俊(186****3130)'
				}, {
					label: '状态',
					value: '已完成'
				}, {
					label: '时间',
					value: '2017-02-08 13:36:07'
				}, {
					label: '数量',
					value: '1盒'
				}
				],
			}
		},
		mounted() {},
		methods: {
			bind() {}
		},
		components: {
			Cell,
			Group,
			XButton,
			FormPreview
		},
	}
</script>
<style lang="css" scoped>

</style>