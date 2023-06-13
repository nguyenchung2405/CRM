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
            contract_type_id: data.contract_type_id.id,
            // discount_by_percent: data.discount_by_percent,
            VAT: data.VAT,
            total: data.total < 1000000 ? data.total * 1000000 : data.total,
            note: data.note,
            creater: data.creater,
            discount_over_contract: data.discount_over_contract * 1000000,
            // payall: data.payall,
            pay_before_run: data.pay_before_run,
            payment_type: data.payment_type,
            event_ID: data.event_ID?.id,
            owner_name: data.owner_name,
            discount_total: data.discount_total,
            original_total: data.original_total,
            real_time_total: data.real_time_total,
            total_completed_payments: data.total_completed_payments,
            total_created_payments: data.total_created_payments,
            history: data.history,
            event_detail_IDs: data.event_detail_IDs
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

export function dataOfPayment(data){
    try {
        let newPayments = data.map(payment => {
            return {
                ...payment,
                total_value: payment.total_value * 1000000
            }
        });
        return newPayments
    } catch (error) {
        console.log(error)
    }
}

export function dataOfEventMapping(data){
    try {
        const dataEvent = {
            "event": {
                id: data.id,
              "name": data.name,
              "from_date": data.from_date,
              "to_date": data.to_date,
              "value_event": data.value_event * 1000000,
              desc: data.desc,
              event_cost_list: data.event_cost_list
            },
            "requests": [
              ...data.details
            ],
            contracts: [ ...data.contracts ]
        }
        return dataEvent;
    } catch (error) {
        console.log(error)
    }
}