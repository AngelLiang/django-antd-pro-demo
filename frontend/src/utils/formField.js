import {
    Select,
    Transfer,
} from 'antd';

export const dealManyToManyField = (item, value, onChange, type, ManyToManyList) => {
    const children = ManyToManyList.map(item => {
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
        return (<Transfer
                showSearch
                dataSource={ManyToManyList}
                targetKeys={value}
                onChange={(targetKeys, direction, moveKeys) => {
                    console.log(targetKeys, direction, moveKeys);
                    if (direction === 'right') {
                        onChange([...targetKeys, ...moveKeys]);
                    } else {
                        onChange(targetKeys.filter(el => !moveKeys.includes(el)));
                    }
                }}
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
