/**
 * @jest-environment jsdom
 */

import { useFormat } from '../src/use/format';
import { useRaw } from '../src/use/raw';

describe('Factory.Sprite', () => {
  beforeEach(() => {});

  it('should not convert unnecessary paragraph', () => {
    const entity = {
      id: 0,
      type: 'heading-one',
      raw: 'Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })
})