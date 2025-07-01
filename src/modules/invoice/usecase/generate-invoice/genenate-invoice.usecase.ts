import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.dto";
import Invoice from "../../domain/invoice.entity";
import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-item.entity";


export default class GenenateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice(
            {
                name: input.name,
                document: input.document,
                address: new Address(
                    input.street,
                    input.number,
                    input.complement,
                    input.city,
                    input.state,
                    input.zipCode,
                ),
                items: input.items.map(
                    (item) =>
                        new InvoiceItems({
                            id: new Id(item.id),
                            name: item.name,
                            price: item.price,
                        })
                )
            }
        )


        await this._invoiceRepository.generate(invoice)

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item: any) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.totalPrice,
        }

    }
}