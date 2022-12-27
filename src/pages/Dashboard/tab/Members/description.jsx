import React from "react";

import { Icon, Typography, Box } from "@mui/material";

function DescriptionMember() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="body2">
                Aqui você consegue ver todos os membros cadastrados à esse dashboard,
                lembrando que somente os membros com acesso de administrador consegue ver a aba 'Dashboard' no menu.
            </Typography>
            <br />
            <img src="/img/svg/members.svg" alt="members" width={250} />
            <br />
            <Typography variant="body2">
                Para elevar ou baixar o nível de um membro basta desmarcar ou marcar o checkbox no final de cada linha
            </Typography>
            <Box display="flex" justifyContent="space-between" width="100%" marginTop={5}>
                <Box display="flex" gap={2}>
                    <Icon style={{ color: "white" }}>
                        check_box
                    </Icon>
                    <Typography variant="body1"><b>O usuário é adminsitrador do sistema</b></Typography>
                </Box>
                <Box display="flex" gap={2}>
                    <Icon style={{ color: "white" }}>
                        check_box_outline_blank
                    </Icon>
                    <Typography variant="body1"><b>O usuário não tem privilégios</b></Typography>
                </Box>
            </Box>
        </Box >
    )
}

export default DescriptionMember