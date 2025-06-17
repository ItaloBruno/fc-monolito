import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.dto";
import Address from "../../../@shared/domain/value-object/address";


export default class FindInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const resultado = await this._invoiceRepository.find(input.id)

        return {
            id: resultado.id.id,
            name: resultado.name,
            document: resultado.document,
            address: new Address(
                resultado.address.street,
                resultado.address.number,
                resultado.address.complement,
                resultado.address.city,
                resultado.address.state,
                resultado.address.zipCode,
            ),
            items: resultado.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: resultado.totalPrice,
            createdAt: resultado.createdAt,
        }
    }

}