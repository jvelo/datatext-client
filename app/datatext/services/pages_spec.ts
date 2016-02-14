import {Page, DefaultPage} from './pages';

export function main() {
  describe('Page', () => {

    it('pages should be clonable', () => {
      const page: Page = new DefaultPage({
        content: 'my content',
        title: 'my title'
      });
      const clone: Page = page.clone();
      expect(clone.title).toEqual(page.title);
      expect(clone.id).toBeUndefined();
    });
  });
}
