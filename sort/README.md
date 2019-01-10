### 给JSON数据排个序

`Javascript`的sort()方法就是`ECMA262`(也就是ES5.1的最终稿)标准的数组的内置ort方法。

`sort()`默认有一个函数叫`comparefn`，如果不指定它就内部自动将数组的所有元素按内建的默认方法排序。如果要指定一个自定义comparefn函数以完成自己想要的自定义排序，那么这个函数**必须符合**以下两个条件:

1. 这个函数只接收两个参数，第一个参数是起始元素自变量，第二个参数是起始元素的后一个元素自变量；
2. 返回值只能有三种情况，小于0表示元素a的值小于元素b的值，大于0表示元素a的值大于元素b的值，等于0表示元素a与元素b相等。

`String` 对象包含一个名为localeCompare的内置方法，它相当于一个comparefc函数，将字串A的值与字串B的内容转码后再比较，然后返回-1/1/0表示两者的大小关系。所以，巧妙的利用这一点，就可以通过sort将json数据来做排序。

不过似乎是汉字编码的原因，中文的排序结果有点差：

```javascript
//...
res.sort(function cmpFn(a, b){
    return a.name.localeCompare(b.name);
});
//...
```

然后这个结果就有意思了……

```javascript
[
    //...
 { label: '佛山Foshan0757',
    name: '佛山',
    pinyin: 'Foshan',
    zip: '0757' },
  { label: '佳木斯Jiamusi0454',
    name: '佳木斯',
    pinyin: 'Jiamusi',
    zip: '0454' },
  { label: '依兰Yilan0451', name: '依兰', pinyin: 'Yilan', zip: '0451' },
  { label: '保定Baoding0312',
    name: '保定',
    pinyin: 'Baoding',
    zip: '0312' },
  { label: '保山Baoshan0875',
    name: '保山',
    pinyin: 'Baoshan',
    zip: '0875' },
    //...
]
```

这是为什么……？……我后来想了几分钟……估计是编码，于是我验证了一下自己的想法：

```javascript
let cityNames = ['佛山','佳木斯','依兰','保定','宝山'];

for(let cityName of cityNames){
    console.log(cityName, ':', cityName.charCodeAt());
};
```

得到结果：

```
佛山 : 20315
佳木斯 : 20339
依兰 : 20381
保定 : 20445
宝山 : 23453
```

所以，如果要汉字排序……我现在有个偷懒的主意，就是像我使用的`cityList.json`这种样例一样，咱们给它来个拼音，然后比对拼音，自然就排序过来了。
当然，这样的缺点是会有冗余的用不到的数据，而且容易出现维护数据错误导致排序也错的问题。

我还有个想法就是把每个字的拼音首字母做比较，流程如下：
1. 获取一个字串，如“佳木斯”
2. 将字串解构为拼音，如“Jia Mu Si”
3. 将拼音首字母组合为字串，如“JMS”
4. 其它字串也是如此转换，然后相互做对比

如果未来能写出来，那我估计会发布在sort2里面吧……
