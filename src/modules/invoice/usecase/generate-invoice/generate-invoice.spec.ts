import GenenateInvoiceUseCase from "./genenate-invoice.usecase";


const output = {
    name: "Merenda",
    document: "Merenda da tarde",
    street: "Rua Carapinima",
    number:"2200",
    complement: "Bairro Benfica",
    city: "Fortaleza",
    state: "CE",
    zipCode: "60020-181",
    items: [
        {
            id: "1",
            name: "coxinha",
            price: 5,
        },
        {
            id: "2",
            name: "pastel",
            price: 10,
        },
    ],
    total: 15,
}


const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
}

describe("Generate Invoice use case unit test", () => {
    it("should generate a Invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenenateInvoiceUseCase(repository)

        const input = {
            name: "Merenda",
            document: "Merenda da tarde",
            street: "Rua Carapinima",
            number:"2200",
            complement: "Bairro Benfica",
            city: "Fortaleza",
            state: "CE",
            zipCode: "60020-181",
            items: [
                {
                    id: "1",
                    name: "coxinha",
                    price: 5,
                },
                {
                    id: "2",
                    name: "pastel",
                    price: 10,
                },
            ],
        }

        const result = await usecase.execute(input)

        expect(repository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(input.name)
        expect(result.document).toEqual(input.document)
        expect(result.street).toEqual(input.street)
        expect(result.number).toEqual(input.number)
        expect(result.complement).toEqual(input.complement)
        expect(result.city).toEqual(input.city)
        expect(result.state).toEqual(input.state)
        expect(result.zipCode).toEqual(input.zipCode)
        expect(result.items.length).toEqual(2)
        expect(result.items[0].id).toEqual(input.items[0].id)
        expect(result.items[0].name).toEqual(input.items[0].name)
        expect(result.items[0].price).toEqual(input.items[0].price)
        expect(result.items[1].id).toEqual(input.items[1].id)
        expect(result.items[1].name).toEqual(input.items[1].name)
        expect(result.items[1].price).toEqual(input.items[1].price)
        expect(result.total).toEqual(15)
    })
})