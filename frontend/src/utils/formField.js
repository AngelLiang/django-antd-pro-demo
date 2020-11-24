import {
    Select,
    Transfer,
} from 'antd';

export const dealManyToManyField = (item, value, onChange, type, ManyToManyList) => {
    const children = ManyToManyList.map(item => {
        // console.log(item)
        return (
            <Select key={item.id} value={item.id}>
                {item.name}
            </Select>
        );
    });
    // console.log(value);
    if (typeof value === 'object') {
        if (value.length > 0 && value[0].hasOwnProperty('id')) {
            value = value.map(one => {
                if (one.hasOwnProperty('id')) {
                    return one.id.toString();
                } else {
                    return one;
                }
            });
            console.log(value);
            onChange(value);
        }
    }
    // console.log(value);
    if (type === 'form') {
        // 穿梭框 https://ant.design/components/transfer-cn/
        return (<Transfer
                showSearch
                dataSource={ManyToManyList}
                targetKeys={value}
                // onChange={(targetKeys, direction, moveKeys) => {
                //     console.log(targetKeys, direction, moveKeys);
                //     if (direction === 'right') {
                //         // onChange([...targetKeys, ...moveKeys]);
                //     } else {
                //         // onChange(targetKeys.filter(el => !moveKeys.includes(el)));
                //     }
                // }}
                rowKey={record => record.id}
                render={item => item.name}
                oneWay={false}
                pagination
            />
        );
    }
    return (
      <Select
        mode="multiple" placeholder={"请选择"+ item.title} onChange={onChange}>
        {children}
      </Select>
    );
};

export const renderManyToMany = (text) => {
    const color_arr = [
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple',
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
    ];
    const child = [];
    let items = [];
    console.log(text);
    for (let key in text) {
        let value = text[key];
        let one = <Descriptions.Item><Tag color={'blue'}>{value.ty_options_display_txt}</Tag></Descriptions.Item>;
        items.push(one);
    }
    text.forEach((value, index, arr) => {
        if (index <= 3) {
            child.push(<Col xs={24} sm={8} md={8} lg={8} xl={6} style={{paddingRight:4, paddingTop: 4}}><Tag
                color={color_arr[index % 10]}><Ellipsis style={{overflow: 'visible'}} tooltip
                                                        length={30}>{value.ty_options_display_txt}</Ellipsis></Tag></Col>);
        } else if (index === 4) {
            child.push(<Popover trigger="click" content={<Descriptions>
                {items}
            </Descriptions>} title="多对多数据"><Col span={3} style={{paddingTop: 4}}><Tag
                color={color_arr[index % 10]}>...</Tag></Col></Popover>);
        }
    });
    return <Row col={12}>{child}</Row>;
};
