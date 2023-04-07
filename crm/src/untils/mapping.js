function mappingDataOfTable(data) {
    try {
        return data.contract_details.map((item) => {
            return {
                desc: item.desc,
                product_ID: item.product_ID,
                real_price: item.real_price,
                from_date: item.from_date,
                to_date: item.to_date
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export function dataOfContractMapping(data) {
    try {
        const dataContract = {
            client_ID: data.client_ID.id,
            owner: data.owner,
            contract_number: data.contract_number,
            begin_date: data.begin_date,
            end_date: data.end_date,
            contract_type_id: data.contract_type_id,
            discount_by_percent: data.discount_by_percent,
            VAT: data.VAT,
            total: data.total < 1000000 ? data.total * 1000000 : data.total,
            note: data.note,
            creater: data.creater
        };
        // let dataTable = mappingDataOfTable(data)
        return {
            dataContract,
            // dataTable
        }
    } catch (error) {
        console.log(error)
    }
}