
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "./invoice-item.entity";
import Invoice from "./invoice.entity";


describe("Testes de unidade de Invoice", () => {
    it("Criando entidade de Invoice", async () => {
        const endereco = new Address(
            "Rua Carapinima",
            "2200",
            "Bairro Benfica",
            "Fortaleza",
            "CE",
            "60020-181",
        )
        const itensDaNota = [
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
        ]

        const input = {
            name: "Merenda",
            document: "Merenda da tarde",
            address: endereco,
            items: itensDaNota,
        }

        const notaFiscal = new Invoice(input)
        expect(notaFiscal.id).toBeDefined()
        expect(notaFiscal.name).toEqual(input.name)
        expect(notaFiscal.document).toEqual(input.document)
        expect(notaFiscal.address).toEqual(input.address)
        expect(notaFiscal.totalPrice).toEqual(15)
    })

    it("Erro quando se tenta criar nota fiscal sem itens", async () => {
        const endereco = new Address(
            "Rua Carapinima",
            "2200",
            "Bairro Benfica",
            "Fortaleza",
            "CE",
            "60020-181",
        )
        const itensDaNota: any[] = []

        const input = {
            name: "Merenda",
            document: "Merenda da tarde",
            address: endereco,
            items: itensDaNota,
        }
        expect(() => {
            new Invoice(input)
        }).toThrowError("A nota fiscal precisa ter pelo menos um item");
    });
})