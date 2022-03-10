
// 第一種各別匯出
// exports.data = 2;
// exports.bark = function() {
// 	return 'bark'
// }

// 第二種一起匯出，兩種方法不可同時用

module.exports = {
	data: 1,
	bark() {
		return 'bark'
	}
}