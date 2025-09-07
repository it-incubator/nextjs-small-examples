import {ServerComponent} from "@/components/ServerComponent";
import {ClientComponent} from "@/components/ClientComponent";
import {ClientWrapper} from "@/components/ClientWrapper";
import {Suspense} from "react";

export default function Demo() {
    return (
        <div>
            Hello Demo Server
            <ClientWrapper>
                <div>Server component inside client wrapper:</div>
                {/*<Suspense fallback={<div>WAIT FOR SERVER RENDER¬</div>}>*/}
                    <ServerComponent/>
                {/*</Suspense>*/}
            </ClientWrapper>
            {/*<Suspense fallback={<div>WAIT FOR SERVER RENDER¬</div>}>*/}
                <ServerComponent/>
            {/*</Suspense>*/}
            <ClientComponent/>
        </div>
    );
}
