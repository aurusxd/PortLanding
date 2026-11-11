import { defineEnvVars } from '@sveltejs/kit/env';

const optional = (value: string | undefined) => (value && value.trim() ? value.trim() : undefined);

export const variables = defineEnvVars({
	TELEGRAM_BOT_TOKEN: {
		description: 'Токен Telegram-бота от @BotFather. Без него заявки не отправляются.',
		schema: optional
	},
	TELEGRAM_CHAT_ID: {
		description: 'ID чата/канала/группы, куда бот присылает заявки (например 123456789 или -1001234567890).',
		schema: optional
	}
});
