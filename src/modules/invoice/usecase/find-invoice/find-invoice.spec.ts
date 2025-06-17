import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";
import Id from "../../../@shared/domain/value-object/id.value-object";


const invoice = new Invoice(
    {
        id: new Id("1"),
        name: "Merenda",
        document: "Merenda da tarde",
        address: new Address(
            "Rua Carapinima",
            "2200",
            "Bairro Benfica",
            "Fortaleza",
            "CE",
            "60020-181",
        ),
        items: [
            new InvoiceItems(
                {
                    name: "coxinha",
                    price: 5,
                },
            ),
            new InvoiceItems(
                {
                    name: "pastel",
                    price: 10,
                },
            )
        ],
    }
)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn(),
    }
}

describe("Find Invoice use case unit test", () => {
    it("should find a Invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase((repository))

        const input = {
            id: "1",
        }

        const result = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toEqual(input.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.address).toEqual(invoice.address)
        expect(result.items.length).toEqual(2)
        expect(result.items[0].name).toEqual(invoice.items[0].name)
        expect(result.items[0].price).toEqual(invoice.items[0].price)
        expect(result.items[1].name).toEqual(invoice.items[1].name)
        expect(result.items[1].price).toEqual(invoice.items[1].price)
        expect(result.total).toEqual(invoice.totalPrice)
        expect(result.createdAt).toEqual(invoice.createdAt)
    })
})