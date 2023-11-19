export class Helpers {


    public generateGUUID(): string {
        let guuid = ''
        for (let i = 0; i < 20; i++) {
            guuid = crypto.randomUUID();
        }
        return guuid;
    }
}