// @ts-ignore
// @ts-nocheck

'use server'

import { db } from '@/drizzle'
import { backpack } from '@/drizzle/schema'
import { BALLS } from '@/libs/constants'
import { eq } from 'drizzle-orm'
import { getBackpack } from './get-backpack'

const BALL_INGREDIENTS: Record<
	string,
	{
		tokenId: number
		ingredients: Array<{
			id: string
			slug: string
			plural: string
			name: string
			amount: number
		}>
	}
> = {
	beast: {
		tokenId: BALLS.BEAST,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'milk', plural: 'milks', name: 'Milk', amount: 10 },
		],
	},
	aquatic: {
		tokenId: BALLS.AQUATIC,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'fish', plural: 'fishes', name: 'Fish', amount: 10 },
		],
	},
	plant: {
		tokenId: BALLS.PLANT,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'plant', plural: 'plants', name: 'Plant', amount: 10 },
		],
	},

	bug: {
		tokenId: BALLS.BUG,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'bug', plural: 'bugs', name: 'Bug', amount: 10 },
		],
	},
	bird: {
		tokenId: BALLS.BIRD,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'feather', plural: 'feathers', name: 'Feather', amount: 10 },
		],
	},
	reptile: {
		tokenId: BALLS.REPTILE,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'bug', plural: 'bugs', name: 'Bug', amount: 10 },
		],
	},
	mech: {
		tokenId: BALLS.MECH,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'star', plural: 'stars', name: 'Dusk', amount: 10 },
		],
	},
	dawn: {
		tokenId: BALLS.DAWN,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'star', plural: 'stars', name: 'Dawn', amount: 10 },
		],
	},

	dusk: {
		tokenId: BALLS.DUSK,
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'moon', plural: 'moons', name: 'Dusk', amount: 10 },
		],
	},
}

export async function craftBall(userId: string, ball: string) {
	try {
		const ballIngredients = BALL_INGREDIENTS[ball]
		const userBackpack = await getBackpack(userId)

		if (!userBackpack) throw new Error('User has no backpack.')

		for (const ingredient of ballIngredients.ingredients) {
			if (ingredient < userBackpack[ingredient.plural]) throw new Error('User has insufficient ingredients.')
		}

		await db
			.update(backpack)
			.set({
				[ballIngredients.ingredients[0].plural]:
					userBackpack[ballIngredients.ingredients[0].plural] - ballIngredients.ingredients[0].amount,
				[ballIngredients.ingredients[1].plural]:
					userBackpack[ballIngredients.ingredients[1].plural] - ballIngredients.ingredients[1].amount,
				[ballIngredients.ingredients[2].plural]:
					userBackpack[ballIngredients.ingredients[2].plural] - ballIngredients.ingredients[2].amount,
			})
			.where(eq(backpack.userId, userId))
	} catch (error) {
		throw new Error('Failed to fetch profile.')
	}
}
