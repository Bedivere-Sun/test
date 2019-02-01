/// <reference path="./namespace.ts" />

//unshift前插
function withUnshift(list: Test.item[], item: Test.item) {
    console.log('unshift性能测试');
    list.unshift(item);
}

//concat前插
function withConcat(list: Test.item[], item: Test.item) {
    console.log('concat性能测试');
    list = Array(item).concat(list);
}

//reverse然后push之后再reverse
function reversePushReverse(list: Test.item[], item: Test.item) {
    console.log('reverse->push->reverse性能测试');
    list = list.reverse();
    list.push(item);
    list = list.reverse();
}


//单一性能测试
function perfTest(func: Function, items: Test.item[], newItem: Test.item) {
    const label: string = '耗费时间(毫秒)';
    console.time(label);

    func(items, newItem);

    console.timeEnd(label);
}

//生成数组和新对象
function generateArray(count: number): Test.item[] {
    let items: Test.item[] = [];
    for (let i = 0; i < count; i++) {
        items.push({ name: `item${i}`, done: false });
    }

    return items
}

//“批量”性能测试
function test(units: number[]) {

    units.map((itemCount, index) => {
        console.log(`\n******************第${index + 1}次测试开始，本次生成${itemCount}个样例******************`);

        let List:Test.item[] = generateArray(itemCount);

        let newItem: Test.item = {
            name: 'New Item Is Here!',
            done: true
        }

        perfTest(withUnshift, List ,newItem);

        List = generateArray(itemCount);
        perfTest(withConcat, List ,newItem);

        List = generateArray(itemCount);
        perfTest(reversePushReverse, List ,newItem);

        console.log(`******************第${index}次测试结束******************\n`);
    });
}


const units: number[] = [10, 100, 1000, 10000, 100000, 1000000];
test(units);
